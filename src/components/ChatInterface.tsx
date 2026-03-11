import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User, Trash2 } from "lucide-react";
import { Message } from "./Message";
import { sendMessage, type ChatMessage } from "../services/gemini";
import { motion, AnimatePresence } from "motion/react";

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hello! I'm your McDelivery Assistant. How can I help you today? You can ask me about our menu, latest offers, or delivery information!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.slice(1); // Exclude initial greeting for history if needed, or keep it
      const response = await sendMessage(messages, userMessage);
      setMessages((prev) => [...prev, { role: "model", text: response }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "model",
        text: "Hello! I'm your McDelivery Assistant. How can I help you today?",
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl">
      {/* Header */}
      <div className="bg-red-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-inner">
            <Bot className="text-red-600" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">McDelivery Assistant</h2>
            <p className="text-xs text-red-100">Always here to help</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-2 hover:bg-red-700 rounded-full transition-colors"
          title="Clear Chat"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <Message key={idx} role={msg.role} text={msg.text} />
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start mb-4"
          >
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-zinc-100 shadow-sm">
              <Loader2 className="animate-spin text-red-600" size={20} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-zinc-100">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about menu, offers, or delivery..."
            className="flex-1 bg-zinc-100 border-none rounded-full px-6 py-3 text-zinc-800 placeholder:text-zinc-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-center text-zinc-400 mt-2">
          Powered by Gemini AI • McDonald's India McDelivery
        </p>
      </div>
    </div>
  );
}
