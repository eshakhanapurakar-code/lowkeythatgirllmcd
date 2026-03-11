import ReactMarkdown from "react-markdown";
import { cn } from "../utils";
import { motion } from "motion/react";

interface MessageProps {
  role: "user" | "model";
  text: string;
}

export function Message({ role, text }: MessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-2 rounded-2xl shadow-sm",
          isUser
            ? "bg-yellow-400 text-black rounded-tr-none"
            : "bg-white text-zinc-800 border border-zinc-100 rounded-tl-none"
        )}
      >
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
