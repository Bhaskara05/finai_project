from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from fastapi.responses import FileResponse, StreamingResponse
import os
import traceback
from typing import Optional, List # THE FIX: Added 'List' to the import
import io
import tempfile
from dotenv import load_dotenv

# Import CORS middleware to allow frontend communication
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from a .env file
load_dotenv()

# --- STT/TTS Library Imports ---
from gtts import gTTS
import speech_recognition as sr
from pydub import AudioSegment

# --- Agent Imports (Corrected Paths) ---
from investment import get_investment_suggestion
from expense import parse_expense_from_text, Expense
from profille import profile_agent, UserProfile, UserProfileUpdate
from savings import savings_agent, SavingsDashboardData

# --- Initialize Recognizer ---
recognizer = sr.Recognizer()

# --- Language Code Mapping ---
LANGUAGE_MAP = { "en-US": "English", "kn-IN": "Kannada" }
GTTS_LANG_MAP = { "en-US": "en", "kn-IN": "kn" }

# --- API Data Models ---
class InvestmentQuery(BaseModel):
    user_query: str
    language: Optional[str] = 'en-US'
class ExpenseText(BaseModel):
    text: str
class TTSQuery(BaseModel):
    text: str
    language: Optional[str] = 'en-US'

# --- API Setup ---
app = FastAPI(title="FinAI API - Final", version="1.0.0")

# --- CORS Middleware Configuration ---
origins = ["http://localhost", "http://localhost:3000", "http://localhost:5173", "http://localhost:8080"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Frontend Serving ---
@app.get("/", response_class=FileResponse, tags=["Frontend"])
async def read_index():
    """Serves the main frontend prototype for testing."""
    return FileResponse("frontend/index.html")

# === Voice Endpoints ===
@app.post("/speech-to-text", tags=["Voice"])
async def handle_speech_to_text(audio_file: UploadFile = File(...), language: str = 'en-US'):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp_webm:
            content = await audio_file.read()
            tmp_webm.write(content)
            webm_path = tmp_webm.name
        wav_path = webm_path.replace(".webm", ".wav")
        AudioSegment.from_file(webm_path, format="webm").export(wav_path, format="wav")
        with sr.AudioFile(wav_path) as source:
            audio_data = recognizer.record(source)
            transcribed_text = recognizer.recognize_google(audio_data, language=language)
        os.remove(webm_path)
        os.remove(wav_path)
        return {"text": transcribed_text}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to process audio check: {str(e)}")

@app.post("/text-to-speech", tags=["Voice"])
async def handle_text_to_speech(query: TTSQuery):
    try:
        lang_code = GTTS_LANG_MAP.get(query.language, 'en')
        tts = gTTS(text=query.text, lang=lang_code, slow=False)
        mp3_fp = io.BytesIO()
        tts.write_to_fp(mp3_fp)
        mp3_fp.seek(0)
        return StreamingResponse(mp3_fp, media_type="audio/mpeg")
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to generate speech: {str(e)}")

# === Core API Endpoints ===
@app.post("/event/expense", response_model=Expense, tags=["Events"])
def process_expense_event(expense_data: ExpenseText):
    """Handles automated expense tracking from phone notifications."""
    try:
        parsed_expense = parse_expense_from_text(expense_data.text)
        profile_agent.add_expense(parsed_expense)
        return parsed_expense
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse expense: {str(e)}")

@app.post("/ask/investment", tags=["Agents"])
def ask_investment_agent(query: InvestmentQuery):
    """Provides personalized investment advice."""
    try:
        current_profile = profile_agent.get_profile()
        language_name = LANGUAGE_MAP.get(query.language, "English")
        suggestion = get_investment_suggestion(current_profile, query.user_query, language_name)
        return {"agent_response": suggestion}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# === Dashboard & Profile Endpoints ===
@app.get("/dashboard/savings", response_model=SavingsDashboardData, tags=["Dashboard"])
def get_savings_dashboard_data():
    """Provides a complete data package for the main dashboard UI."""
    current_profile = profile_agent.get_profile()
    return savings_agent.analyze_and_get_dashboard_data(current_profile)

@app.get("/profile", response_model=UserProfile, tags=["Profile"])
def get_user_profile(): 
    """Retrieves the full user profile."""
    return profile_agent.get_profile()

@app.put("/profile", response_model=UserProfile, tags=["Profile"])
def update_user_profile(update_data: UserProfileUpdate): 
    """Updates fields in the user's profile."""
    return profile_agent.update_profile(update_data)

# NEW: Endpoint for the dynamic Expenses page
@app.get("/expenses", response_model=List[Expense], tags=["Expenses"])
def get_all_expenses():
    """Retrieves the full list of all recorded expenses for the user."""
    return profile_agent.get_profile().expenses

