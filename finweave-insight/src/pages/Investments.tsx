import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, Volume2 } from "lucide-react";

// The API endpoint remains the same.
const API_BASE_URL = "http://127.0.0.1:8000";

const InvestmentAgent: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<"en-US" | "kn-IN">("en-US");
  const [investInput, setInvestInput] = useState("");
  const [investResponse, setInvestResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rawTextForTTS, setRawTextForTTS] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  // For a multi-user app, this would come from an auth context.
  const userEmail = "prasad@example.com";

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = currentLang;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (e: any) => {
        console.error("Speech recognition error:", e.error);
        setIsListening(false);
    }
    recognition.onresult = (e: any) => setInvestInput(e.results[0][0].transcript);
    recognitionRef.current = recognition;
  }, [currentLang]);

  const startListening = () => {
    if (!recognitionRef.current) return alert("Speech recognition is not available.");
    if (isListening) return recognitionRef.current.stop();
    try {
      recognitionRef.current.start();
    } catch (e) {
      alert("Speech recognition could not start. Please check browser permissions.");
    }
  };

  const callAgent = async () => {
    if (!investInput.trim()) return;

    setIsLoading(true);
    setInvestResponse(""); // Clear previous response
    setRawTextForTTS("");

    try {
      const response = await fetch(`${API_BASE_URL}/ask/investment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_query: investInput, language: currentLang, email: userEmail }),
      });
      if (!response.ok) throw new Error(`API Error (${response.status})`);

      const data = await response.json();
      const responseText = data.agent_response;
      setRawTextForTTS(responseText);

      const formattedText = responseText
        .replace(/#\s(.*?)\n/g, "<h3 class='text-xl font-semibold mb-3 text-gray-800'>$1</h3>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' target='_blank' class='text-blue-600 font-medium hover:underline'>$1</a>")
        .replace(/\n/g, "<br />");
      setInvestResponse(formattedText);
    } catch (error: any) {
      setInvestResponse(`<p class="text-red-600 font-medium">Error: ${error.message}. Is the backend running?</p>`);
    } finally {
      setIsLoading(false);
    }
  };

  // Instant frontend speech (replace your old speakText)
  const speakText = () => {
  if (!rawTextForTTS) return;

  // Clean text
  const cleanText = rawTextForTTS
    .replace(/#\s/g, "")
    .replace(/\*/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1");

  // Cancel any ongoing speech before starting new
  window.speechSynthesis.cancel();

  // Split into sentences (so long text doesn’t break)
  const sentences = cleanText.split(/(?<=[.!?])\s+/);

  sentences.forEach((sentence) => {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = currentLang;
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  });
};

const stopSpeech = () => {
  window.speechSynthesis.cancel();
};



  // const speakText = async () => {
  //   if (!rawTextForTTS) return;
  //   const cleanText = rawTextForTTS.replace(/#\s/g, "").replace(/\*/g, "").replace(/\[(.*?)\]\(.*?\)/g, "$1");

  //   try {
  //     const response = await fetch(`${API_BASE_URL}/text-to-speech`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ text: cleanText, language: currentLang }),
  //     });
  //     if (!response.ok) throw new Error("Failed to generate speech.");

  //     const blob = await response.blob();
  //     if (audioPlayerRef.current) {
  //       audioPlayerRef.current.src = URL.createObjectURL(blob);
  //       audioPlayerRef.current.play();
  //     }
  //   } catch (error) {
  //     alert("TTS failed.");
  //     console.error(error);
  //   }
  // };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      callAgent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center p-4 font-sans selection:bg-blue-100">
      <div className="w-full max-w-4xl mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-6xl font-extrabold text-gray-800 tracking-tight">
            FinAI
          </h1>
          <p className="text-gray-500 mt-3 text-lg">Your AI Investment Friend</p>
        </motion.header>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="mb-8 text-center">
              <div className="inline-flex rounded-full shadow-sm bg-white border border-gray-200 p-1" role="group">
                {["en-US", "kn-IN"].map(lang => (
                  <button
                    key={lang}
                    onClick={() => setCurrentLang(lang as any)}
                    className={`px-6 py-2 text-sm font-semibold transition-colors rounded-full ${
                      currentLang === lang 
                      ? "bg-blue-600 text-white shadow" 
                      : "bg-transparent text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {lang === "en-US" ? "English" : "ಕನ್ನಡ"}
                  </button>
                ))}
              </div>
            </div>

            <main className="bg-white p-8 rounded-3xl shadow-2xl shadow-gray-200/50 flex flex-col">
              <div className="relative w-full">
                <textarea
                  value={investInput}
                  onChange={(e) => setInvestInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full p-4 pr-28 bg-gray-100 border-2 border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white focus:border-blue-400 transition-all text-base"
                  rows={3}
                  placeholder="Ask for investment advice..."
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button 
                      onClick={startListening} 
                      className={`p-2.5 rounded-full transition-colors ${
                        isListening 
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`} 
                      disabled={!speechSupported}
                      title={speechSupported ? "Use Microphone" : "Speech not supported"}
                    >
                      <Mic size={20} />
                    </button>
                    <button 
                      onClick={callAgent} 
                      className="py-2.5 px-5 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:bg-blue-300 disabled:scale-100 flex items-center"
                      disabled={isLoading || !investInput.trim()}
                    >
                      <Send size={18} className="mr-2"/>
                      <span>{isLoading ? "Thinking..." : "Advise"}</span>
                    </button>
                    <button
                    onClick={stopSpeech}
                    className="mt-3 w-12 h-12 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-700 shadow-lg"
                  >
                    ⏹
                  </button>

                </div>
              </div>
              
              <AnimatePresence>
              {(isLoading || investResponse) && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex-grow bg-gray-50 border p-6 rounded-xl mt-6 min-h-[250px] overflow-y-auto text-gray-700 prose prose-lg max-w-none" 
                >
                  {isLoading && !investResponse && <p className='text-blue-600 animate-pulse'>FinAI is thinking...</p>}
                  <div dangerouslySetInnerHTML={{ __html: investResponse }} />
                </motion.div>
              )}
              </AnimatePresence>
              
              <AnimatePresence>
              {rawTextForTTS && !isLoading && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <button 
                      onClick={speakText} 
                      className="w-full mt-6 py-3 px-6 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-800 flex items-center justify-center space-x-2 disabled:bg-gray-400"
                      disabled={!rawTextForTTS || isLoading}
                    >
                      <Volume2 size={20} /> 
                      <span>Speak Response</span>
                    </button>
                </motion.div>
              )}
              </AnimatePresence>
            </main>
        </motion.div>
        
        <audio ref={audioPlayerRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default InvestmentAgent;

