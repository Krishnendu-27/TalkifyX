import React from "react";
import { MessageSquareText, Lock } from "lucide-react";
import { useTheme } from "../../theme/Theme";
import { Image } from "../../assets/image"; // Optional: Use your logo here if you want
import { useThemeStore } from "../../stores/useThemeStore";

const EmptyChatState = () => {
  const theme = useTheme();
  const isDark = useThemeStore((state) => state.isDarkMode);

  return (
    <div
      className={`
        flex flex-col items-center justify-center h-full w-full px-6 text-center
        ${theme.navBg} border-b-8 border-cyan-500
      `}
    >
      <div className="flex items-center justify-center mb-6 relative">
        <div
          className={`absolute inset-0 ${
            isDark ? "bg-cyan-500/10" : "bg-cyan-500/30"
          }  rounded-full animate-ping opacity-75`}
        />
        <div
          className={`relative p-8 rounded-full ${theme.navBg} shadow-sm border-5 ${theme.divider}`}
        >
          <MessageSquareText
            size={64}
            strokeWidth={1.5}
            className="text-cyan-500"
          />
        </div>
      </div>

      {/* --- WELCOME TEXT --- */}
      <h2
        className={`text-2xl md:text-3xl font-semibold font-mono mb-3 ${theme.text}`}
      >
        Welcome to TalkifyX
      </h2>

      <p
        className={`text-sm md:text-base font-medium max-w-md leading-relaxed ${theme.textMuted}`}
      >
        Select a conversation from the sidebar to start chatting, or search for
        a new connection.
      </p>

      {/* --- SECURITY BADGE (Bottom) --- */}
      <div className="absolute bottom-8 flex items-center gap-2 text-xs text-gray-400">
        <Lock size={14} />
        <span>Secure</span>
      </div>
    </div>
  );
};

export default EmptyChatState;
