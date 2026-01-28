import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'مرحباً بك في دوموك! 👋 أنا مساعدك الذكي. كيف يمكنني مساعدتك في حلول الليثيوم أو الخدمات اللوجستية اليوم؟' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !process.env.API_KEY) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `You are a customer support agent for "Dumuk" (دوموك), a premium Saudi company. 
            Answer briefly, professionally, and in Arabic. 
            
            Company Context & Philosophy:
            "In Dumuk, we believe the future is made from details others don't see. We mix technology, precision, and speed."
            
            Services:
            1. Lithium Solutions: High efficiency batteries, industrial power systems, custom solutions, technical support. Focused on stability and safety.
            2. Logistics Services: Domestic and international shipments, live tracking, storage/distribution. Focused on flow and safety.

            Tone: Modern, Efficient, Trustworthy, Helpful.
            User query: ${input}` }]
          }
        ]
      });

      const text = response.text;
      setMessages(prev => [...prev, { role: 'model', text: text || 'عذراً، واجهت مشكلة في الرد. يرجى المحاولة لاحقاً.' }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'عذراً، حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!process.env.API_KEY) return null; // Hide if no API key configured

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(65,166,126,0.4)] transition-all duration-300 flex items-center justify-center ${isOpen ? 'bg-brand-surface rotate-90' : 'bg-gradient-to-r from-brand-blue to-brand-green hover:scale-110'}`}
      >
        {isOpen ? <X className="text-white" /> : <MessageCircle className="text-white w-8 h-8" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 md:w-96 bg-brand-card border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-blue to-brand-green p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
               <Sparkles className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">مساعد دوموك الذكي</h3>
              <p className="text-white/80 text-xs">يعمل بواسطة Gemini AI</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-dark/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-brand-blue text-white font-medium rounded-br-none' 
                      : 'bg-white/10 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-brand-card border-t border-white/5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="اكتب استفسارك هنا..."
                className="w-full bg-brand-dark border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:border-brand-green focus:outline-none transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute left-2 p-2 bg-brand-green text-white rounded-full hover:bg-brand-green/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} className="rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};