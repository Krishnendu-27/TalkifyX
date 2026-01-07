import React, { useState, useRef, useEffect } from "react";
import { Send, Smile, Paperclip } from "lucide-react";
import { useTheme } from "../../theme/Theme";
import useChatStore from "../../stores/useChatStore";
import { useThemeStore } from "../../stores/useThemeStore";

const ChatInput = () => {
  const theme = useTheme();
  const isDark = useThemeStore((state) => state.isDarkMode);
  const { sendMessage, emitTyping, emitStopTyping } = useChatStore();

  const [content, setContent] = useState("");
  const [typing, setTyping] = useState(false);

  // Logic to handle "Stop Typing" delay
  const typingTimeoutRef = useRef(null);

  const handleTyping = (e) => {
    setContent(e.target.value);

    // 1. Emit "Typing" immediately if not already typing
    if (!typing) {
      setTyping(true);
      emitTyping();
    }

    // 2. Clear existing timer
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // 3. Set new timer to stop typing after 3 seconds of inactivity
    const timerLength = 3000;
    typingTimeoutRef.current = setTimeout(() => {
      emitStopTyping();
      setTyping(false);
    }, timerLength);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    // Send logic
    await sendMessage(content);

    // Cleanup
    setContent("");
    emitStopTyping();
    setTyping(false);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className={`
        flex items-end gap-2 p-3 border-t backdrop-blur-sm
        ${
          isDark
            ? "bg-slate-900/90 border-white/5"
            : "bg-white/90 border-slate-200"
        }
      `}
    >
      {/* Attachment Button (Visual Only) */}
      <button
        type="button"
        className={`p-2 rounded-full mb-1 transition-colors ${theme.sidebarIconInactive}`}
      >
        <Paperclip size={20} />
      </button>

      {/* Input Field */}
      <div
        className={`flex-1 relative rounded-2xl border transition-all ${theme.inputBg}`}
      >
        <textarea
          value={content}
          onChange={handleTyping}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className={`
            w-full max-h-32 min-h-[44px] py-2.5 pl-4 pr-10 resize-none bg-transparent border-none focus:ring-0 outline-none
            scrollbar-hide ${theme.text} placeholder:text-slate-400
          `}
          style={{ height: "44px" }} // You can add auto-resize logic here if needed
        />

        {/* Emoji Icon positioned inside input */}
        <button
          type="button"
          className="absolute right-3 bottom-2.5 text-slate-400 hover:text-cyan-500 transition-colors"
        >
          <Smile size={20} />
        </button>
      </div>

      {/* Send Button */}
      <button
        type="submit"
        disabled={!content.trim()}
        className={`
          p-3 rounded-full mb-1 shadow-md transition-all duration-200
          ${
            content.trim()
              ? "bg-cyan-500 hover:bg-cyan-600 text-white transform hover:scale-105 active:scale-95"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
          }
        `}
      >
        <Send size={20} className={content.trim() ? "ml-0.5" : ""} />
      </button>
    </form>
  );
};

export default ChatInput;
