import React from "react";
import { Search, MessageSquarePlus } from "lucide-react";
import { useTheme } from "../../theme/Theme";
import { data, Link } from "react-router-dom";
import useChatStore from "../../stores/useChatStore";
import ChatList from "./ChatList";
import { AnimatePresence, motion } from "motion/react";
import { useThemeStore } from "../../stores/useThemeStore";

const ChatListSidebar = () => {
  const theme = useTheme();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { chats, selectedChat, setSelectedChat, isLoadingChats } =
    useChatStore();

  return (
    <div className={`flex flex-col h-full w-full ${theme.bg}`}>
      {/* Header / Search */}
      <div className={`p-4  ${theme.bg} flex items-center justify-between`}>
        <h1 className={`text-xl font-bold ${theme.text}`}>Chats</h1>
        <Link to="/create">
          <MessageSquarePlus size={25} />
        </Link>
      </div>
      <div
        className={`group flex items-center gap-3 m-2 px-4 py-2.5 rounded-xl transition-all duration-300
    ${
      isDarkMode
        ? "bg-slate-900/70 border-2 border-white/5 focus-within:border-cyan-500/50 shadow-lg shadow-black/30"
        : "bg-white border-2 border-neutral-200 focus-within:border-cyan-500 shadow-sm"
    }
    
  `}
      >
        <Search
          size={18}
          className={`transition-colors duration-300 
      group-focus-within:text-cyan-500 ${theme.textMuted}`}
        />

        <input
          type="text"
          placeholder="Search or start a new chat"
          className={`w-full bg-transparent text-sm outline-none placeholder:text-neutral-400
      ${theme.text}`}
        />
      </div>

      <div className={`flex-1 overflow-y-auto custom-scrollbar ${theme.bg}`}>
        <ChatList chats={chats} theme={theme} />
      </div>
    </div>
  );
};

export default ChatListSidebar;
