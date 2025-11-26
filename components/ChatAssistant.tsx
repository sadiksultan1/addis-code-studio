
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Mic, Bot, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  themeColor: string;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose, themeColor }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am Addis Chat. I can speak English, Amharic, and Afaan Oromo. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const SYSTEM_INSTRUCTION = `
    You are "Addis Chat", the intelligent AI Assistant for "Addis Web Studio".

    **DEVELOPER CREDIT (IMPORTANT):**
    - You must explicitly state that **Sadik Sultan** is the sole developer and creator of this website ("Addis Web Studio") and this AI Chat system.
    - Describe Sadik Sultan as a highly skilled **Senior Full Stack Developer** and **AI Engineer** based in Addis Ababa.
    - Highlight his expertise in modern technologies like React, TypeScript, Tailwind CSS, Firebase, and Artificial Intelligence integration.

    **LANGUAGE RULES:**
    - You are fluent in **English**, **Amharic**, and **Afaan Oromo**.
    - **Strict Rule:** Always reply in the EXACT language the user is using. If they ask in Amharic, reply in Amharic. If Afaan Oromo, reply in Afaan Oromo.

    **BUSINESS KNOWLEDGE:**
    - Services: Premium Website Creation, Professional Photo Design, and Cinematic Video Editing.
    - Pricing: Projects range from $500 to $1800 USD (or equivalent in ETB).
    - Payment Methods: TeleBirr, PayPal, Vodafone Cash, Bank Transfer, and Cash.
    - Contact: sadiksultan43@gmail.com.
    
    **INTERACTION STYLE:**
    - Be professional, polite, and enthusiastic.
    - Keep answers concise unless asked for details.
  `;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Construct history for context
      const history = messages.slice(-10).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Add the new user message to the request
      const model = "gemini-2.5-flash";
      const response = await ai.models.generateContent({
        model: model,
        contents: [
          ...history.map(h => ({ role: h.role, parts: h.parts })), 
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const reply = response.text || "I apologize, I couldn't process that request right now.";
      
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the server. Please check your internet connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; 

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech error", event);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  // Determine styles based on themeColor
  const getThemeColors = () => {
    switch (themeColor) {
      case 'purple': return { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-400', border: 'border-purple-500/30', gradient: 'from-purple-900/90' };
      case 'green': return { bg: 'bg-green-600', hover: 'hover:bg-green-700', text: 'text-green-400', border: 'border-green-500/30', gradient: 'from-green-900/90' };
      case 'orange': return { bg: 'bg-orange-600', hover: 'hover:bg-orange-700', text: 'text-orange-400', border: 'border-orange-500/30', gradient: 'from-orange-900/90' };
      default: return { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-400', border: 'border-blue-500/30', gradient: 'from-blue-900/90' };
    }
  };

  const theme = getThemeColors();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md flex flex-col bg-[#0f172a] border border-white/10 shadow-2xl rounded-2xl overflow-hidden font-sans ring-1 ring-white/5 animate-fade-in-up transition-all duration-300
                      h-[85vh] sm:h-[650px] max-h-[90vh]"> 
        
        {/* Header */}
        <div className={`flex-none p-4 bg-gradient-to-r ${theme.gradient} to-[#0f172a] backdrop-blur-md border-b border-white/10 flex justify-between items-center shadow-lg`}>
          <div className="flex items-center gap-3">
             <div className="relative group">
                <div className={`bg-white/10 p-2 rounded-xl border border-white/10 group-hover:bg-white/20 transition-colors`}>
                  <Bot className={`${theme.text} w-6 h-6`} />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[#0f172a]"></span>
                </span>
             </div>
             <div>
                <h3 className="text-white font-bold text-base font-serif tracking-wide leading-none">Addis Chat</h3>
                <div className="flex items-center gap-1.5 mt-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                   <span className="text-[11px] text-gray-300 font-medium opacity-90">Always Online</span>
                </div>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all active:scale-95" 
            aria-label="Close Chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0f172a] scroll-smooth custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
              {msg.role === 'model' && (
                 <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-2 flex-shrink-0 mt-2">
                    <Bot size={14} className={theme.text} />
                 </div>
              )}
              <div 
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? `${theme.bg} text-white rounded-br-none` 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-2 flex-shrink-0 mt-2">
                 <Bot size={14} className={theme.text} />
              </div>
              <div className="bg-white/5 text-gray-400 px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                <span className="text-xs font-medium">Addis is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex-none p-3 sm:p-4 bg-[#0f172a] border-t border-white/10">
          <div className="relative flex items-center gap-2">
            <button 
              onClick={toggleListening}
              className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                isListening 
                  ? 'bg-red-500/20 text-red-400 animate-pulse border border-red-500/50' 
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
              title="Voice Input"
            >
              <Mic size={20} />
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/20 transition-colors min-w-0 placeholder-gray-600"
            />
            
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`p-3 ${theme.bg} ${theme.hover} text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex-shrink-0 active:scale-95`}
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-center mt-2 flex items-center justify-center gap-2 opacity-50">
             <Sparkles size={8} className={theme.text} />
             <p className="text-[10px] text-gray-500 font-medium">Powered by Gemini AI • Multilingual Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
