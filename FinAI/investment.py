import os
import requests
import json
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from typing import List, Dict, Any
# THE FIX: Corrected import path from 'profille' to 'profile'
from profille import UserProfile
from pydantic import BaseModel
# NEW: Import dotenv to ensure API keys are loaded
from dotenv import load_dotenv
from alpha_vantage.timeseries import TimeSeries

# THE FIX: Load environment variables directly within this module
load_dotenv() 

# --- API Keys (Now reliably loaded from .env file) ---
GNEWS_API_KEY = os.environ.get("GNEWS_API_KEY")
ALPHA_VANTAGE_API_KEY = os.environ.get("ALPHA_VANTAGE_API_KEY")

# --- Data Fetching Functions for Multiple Sources ---

def fetch_gnews_sentiment() -> List[str]:
    """Fetches qualitative market sentiment from news headlines."""
    if not GNEWS_API_KEY:
        return ["GNews API Key not configured."]
    print("🤖 [Data Fetcher] Calling GNews API for market sentiment...")
    try:
        response = requests.get(
            f"https://gnews.io/api/v4/top-headlines?category=business&lang=en&country=in&token={GNEWS_API_KEY}",
            timeout=10
        )
        response.raise_for_status()
        articles = response.json().get("articles", [])
        return [f"- {article['title']} (Source: {article['url']})" for article in articles[:3]]
    except Exception as e:
        print(f"🚨 GNews API call failed: {e}")
        return ["Could not fetch live news sentiment."]

def fetch_market_performance() -> Dict[str, Any]:
    """Fetches quantitative market performance data for a key Indian index."""
    if not ALPHA_VANTAGE_API_KEY:
        return {"error": "Alpha Vantage API Key not configured."}
    print("🤖 [Data Fetcher] Calling Alpha Vantage API for NIFTY 50 performance...")
    try:
        ts = TimeSeries(key=ALPHA_VANTAGE_API_KEY, output_format='pandas')
        # We use '^NSEI' which is the ticker symbol for the NIFTY 50 index
        data, _ = ts.get_daily(symbol='^NSEI', outputsize='compact')
        if data.empty:
            return {"error": "Could not retrieve NIFTY 50 data."}
        
        latest = data.iloc[0]
        previous = data.iloc[1]
        change = latest['4. close'] - previous['4. close']
        percent_change = (change / previous['4. close']) * 100
        
        return {
            "index_name": "NIFTY 50",
            "latest_close": f"{latest['4. close']:.2f}",
            "daily_change": f"{change:+.2f}",
            "percent_change": f"{percent_change:+.2f}%",
            "trend": "upward" if change > 0 else "downward"
        }
    except Exception as e:
        print(f"🚨 Alpha Vantage API call failed: {e}")
        return {"error": f"Could not fetch live market data: {str(e)}"}

# --- The Transparent Financial Analyst Agent ---

def get_investment_suggestion(user_profile: UserProfile, user_query: str, language_name: str = 'English') -> str:
    
    # 1. Gather data from multiple sources
    news_sentiment = fetch_gnews_sentiment()
    market_performance = fetch_market_performance()

    # 2. Define the new Chain-of-Thought prompt
    prompt_template = ChatPromptTemplate.from_template(
        "You are FinAI, a transparent and trustworthy AI financial advisor. Your response MUST be in {language_name}.\n\n"
        "To build trust with the user, you MUST follow this Chain-of-Thought process:\n\n"
        "**Step 1: Data Synthesis.** Briefly summarize the multiple data sources you have analyzed. State the qualitative news sentiment and the quantitative market performance data.\n\n"
        "**Step 2: Cross-Validation & Reasoning.** Explain how these data points connect and validate each other. For example: 'The news suggests a positive outlook in the tech sector, and the NIFTY 50's upward trend provides quantitative support for this sentiment.' Then, explain how this analysis applies to the user's specific profile (age, risk tolerance, goals).\n\n"
        "**Step 3: Actionable Recommendation.** Based on your reasoning, provide a clear, actionable investment suggestion. Cite the news sources where relevant.\n\n"
        "**Step 4: Confidence & Risks.** State your confidence level (High/Medium/Low) and briefly mention potential risks or alternatives.\n\n"
        "--- DATA ---\n"
        "USER PROFILE:\n{user_profile_data}\n\n"
        "QUALITATIVE DATA (News Sentiment):\n{news_data}\n\n"
        "QUANTITATIVE DATA (Market Performance):\n{market_data}\n\n"
        "USER'S QUESTION: '{user_query}'\n\n"
        "--- END DATA ---\n\n"
        "Now, begin your trusted analysis by following the 4 steps."
    )

    chat = ChatGroq(temperature=0.2, model_name="llama-3.1-8b-instant")
    chain = prompt_template | chat | StrOutputParser()
    
    response = chain.invoke({
        "language_name": language_name,
        "user_profile_data": user_profile.model_dump_json(indent=2),
        "news_data": "\n".join(news_sentiment),
        "market_data": json.dumps(market_performance, indent=2),
        "user_query": user_query
    })
    return response