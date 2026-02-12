
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Send, 
  X, 
  MessageSquare, 
  Sparkles, 
  ChevronRight, 
  Maximize2,
  Minimize2,
  HelpCircle,
  Stethoscope,
  Pill,
  Phone,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { generateResponse, getInitialGreeting } from "@/lib/chatLogic";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  link?: string;
  linkText?: string;
}

// Simple markdown parser for chat messages
const parseMarkdown = (text: string): React.ReactNode[] => {
  // Split text into lines
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  
  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) {
      elements.push(<br key={`br-${lineIdx}`} />);
    }
    
    // Parse inline formatting: **bold**, *italic*
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    
    parts.forEach((part, partIdx) => {
      const key = `${lineIdx}-${partIdx}`;
      
      if (part.startsWith('**') && part.endsWith('**')) {
        // Bold
        elements.push(
          <strong key={key} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      } else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        // Italic
        elements.push(
          <em key={key} className="italic opacity-80">
            {part.slice(1, -1)}
          </em>
        );
      } else {
        elements.push(<span key={key}>{part}</span>);
      }
    });
  });
  
  return elements;
};

const IntelligentChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Show tooltip once after 5s delay on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasHovered && !isOpen) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 4000);
      }
    }, 5000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize chat with context-aware greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialGreeting = getInitialGreeting({ page: location.pathname });
      setMessages([
        {
          id: 'init-1',
          text: initialGreeting,
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, location.pathname, messages.length]);

  // Scroll to bottom of chat
  useEffect(() => {
    setTimeout(() => {
       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages, isTyping]);

  const handleSend = async (text: string | null = null) => {
    const finalInput = text || input;
    if (!finalInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: finalInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await generateResponse(userMessage.text, { page: location.pathname });
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        link: response.link,
        linkText: response.linkText
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    handleSend(action);
  };

  const handleReset = () => {
    setMessages([]);
    const initialGreeting = getInitialGreeting({ page: location.pathname });
    setMessages([
        {
          id: 'init-reset',
          text: initialGreeting,
          sender: 'bot',
          timestamp: new Date()
        }
    ]);
  };

  const quickActions = [
    { label: "Product Info", icon: Pill, query: "Tell me about your product range." },
    { label: "Consult Vet", icon: Stethoscope, query: "I need to consult a veterinarian." },
    { label: "Contact Support", icon: Phone, query: "How do I contact support?" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] md:w-[420px] h-[600px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-5 flex items-center justify-between text-white shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 pattern-grid-lg opacity-10" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm shadow-inner group">
                    <Bot size={28} className="group-hover:rotate-12 transition-transform" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-emerald-600 animate-pulse shadow-sm" />
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight">Agvet AI</h3>
                  <p className="text-[10px] text-emerald-100 uppercase font-black tracking-widest flex items-center gap-1 opacity-80">
                    <Sparkles size={10} className="animate-pulse" /> Intelligent Hub
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button 
                  onClick={handleReset}
                  title="Reset Chat"
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors text-white/70 hover:text-white"
                >
                  <RefreshCw size={16} />
                </button>
                <button 
                  onClick={() => setIsMinimized(true)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors text-white/70 hover:text-white"
                >
                  <Minimize2 size={18} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors text-white/70 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/30 dark:bg-slate-900/40 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm transition-all ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none font-medium'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-700/50 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {msg.sender === 'bot' ? (
                        msg.text.split('💡').map((part, i) => (
                          i === 0 
                            ? <span key={i}>{parseMarkdown(part)}</span>
                            : <div key={i} className="mt-3 p-3 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-2xl border border-emerald-500/20 italic text-xs animate-in fade-in slide-in-from-bottom-2 duration-700">💡{parseMarkdown(part)}</div>
                        ))
                      ) : (
                        msg.text
                      )}
                    </div>
                    
                    {msg.link && (
                      <div className="mt-4">
                        {msg.link.startsWith('http') ? (
                          <a 
                            href={msg.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all shadow-md group"
                          >
                            {msg.linkText || 'Learn More'} <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <Link 
                            to={msg.link}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all shadow-md group"
                          >
                            {msg.linkText || 'Learn More'} <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        )}
                      </div>
                    )}

                    <div className={`text-[9px] mt-2 font-bold uppercase tracking-widest opacity-40 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 px-5 py-4 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-0" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-150" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-300" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Quick Actions */}
            {messages.length < 3 && !isTyping && (
                <div className="px-5 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action.query)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50/80 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 rounded-2xl text-[11px] font-black uppercase tracking-wider hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all whitespace-nowrap border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm"
                    >
                      <action.icon size={12} />
                      {action.label}
                    </button>
                  ))}
                </div>
            )}

            {/* Input Area */}
            <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Agvet AI something..."
                    className="w-full pl-5 pr-12 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-white border-2 border-transparent focus:border-emerald-500/20 focus:bg-white dark:focus:bg-slate-800 outline-none text-sm font-medium transition-all placeholder:text-slate-400"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Sparkles size={18} className={`${input ? "text-emerald-500 animate-pulse" : "text-slate-300"}`} />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!input.trim()}
                  className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all"
                >
                  <Send size={18} />
                </motion.button>
              </form>
              <div className="text-[9px] text-center mt-3 font-bold uppercase tracking-widest text-slate-400">
                Managed by Agvet Intelligence System • v3.0 (Smart)
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <div className="flex flex-col items-end gap-3">
        {/* Tooltip Bubble - same write-up from former WhatsApp icon */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-slate-900 border border-emerald-500/20 text-white text-sm px-4 py-3 rounded-2xl rounded-br-sm shadow-xl max-w-[240px] backdrop-blur-md"
            >
              <p className="font-medium text-xs">
                👋 Need help? Click here to chat with our
                <span className="text-emerald-400 font-bold"> Agvet AI Assistant</span> for
                instant support
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center"
              >
                <X size={10} className="text-slate-400" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimized State Bubble */}
        <AnimatePresence>
          {isMinimized && isOpen && (
             <motion.div
               initial={{ opacity: 0, x: 20, scale: 0.8 }}
               animate={{ opacity: 1, x: 0, scale: 1 }}
               exit={{ opacity: 0, x: 20, scale: 0.8 }}
               onClick={() => setIsMinimized(false)}
               className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-emerald-600 dark:text-emerald-400 px-5 py-2.5 rounded-full shadow-xl border border-emerald-500/20 cursor-pointer flex items-center gap-3 mb-2 hover:bg-emerald-500/10 transition-all font-black uppercase text-[10px] tracking-widest"
             >
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               Chat Active
             </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            setShowTooltip(false);
            if (isMinimized) {
              setIsMinimized(false);
            } else {
              setIsOpen(!isOpen);
            }
          }}
          onMouseEnter={() => {
            if (!isOpen) {
              setHasHovered(true);
              setShowTooltip(true);
            }
          }}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className={`w-16 h-16 rounded-[1.75rem] flex items-center justify-center shadow-2xl relative transition-all duration-500 ease-out ${
            isOpen && !isMinimized
              ? "bg-slate-900 text-emerald-400 scale-90"
              : "bg-gradient-to-br from-emerald-600 to-teal-500 text-white"
          }`}
        >
          {/* Pulse ring - same as former WhatsApp icon */}
          {!isOpen && (
            <>
              <div className="absolute inset-0 rounded-[1.75rem] bg-emerald-500/30 animate-ping opacity-60" />
              <div className="absolute inset-1 rounded-[1.75rem] bg-emerald-500/20 animate-pulse" />
            </>
          )}

          {isOpen && !isMinimized ? (
             <X size={28} className="rotate-180 transition-transform duration-500" />
          ) : (
            <>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Bot size={34} />
              </motion.div>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default IntelligentChatbot;
