import React from "react";
import { ArrowLeft, Info, MoreVertical, Phone, Video } from "lucide-react";
import useChatStore from "../../stores/useChatStore";
import useAuthStore from "../../stores/useAuthStore";
import { useTheme } from "../../theme/Theme";
import { getSender, getSenderImage, getSenderName } from "../../util/chatUtils";
import { useThemeStore } from "../../stores/useThemeStore";
import { Image } from "../../assets/image";
import { Link } from "react-router-dom";

const ChatHeader = () => {
  const theme = useTheme();
  const { user } = useAuthStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const { selectedChat, setSelectedChat, isTyping } = useChatStore();

  if (!selectedChat) return null;

  const isGroup = selectedChat.isGroupChat;

  const otherUser = isGroup ? null : getSender(user, selectedChat.users);

  let statusText = "";
  if (isGroup) {
    statusText = `${selectedChat.users.length} members`;
  } else if (isTyping) {
    statusText = "Typing...";
  }

  const statusColor = isTyping
    ? "text-cyan-500 font-semibold"
    : theme.textMuted;

  return (
    <div
      className={`
      w-full h-20 px-6 flex items-center justify-between 
      border-b ${theme.divider} ${theme.navBg} backdrop-blur-sm z-10
    `}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSelectedChat(null)}
          className="md:hidden p-2 -ml-2 rounded-full hover:bg-black/5 text-slate-500"
        >
          <Link to="/">
            <ArrowLeft size={20} />
          </Link>
        </button>

        <div className="relative">
          <img
            src={
              isGroup ? Image.group : getSenderImage(user, selectedChat.users)
            }
            alt="Avatar"
            className={`w-10 h-10 rounded-full object-cover border ${
              isDarkMode ? "border-white/10" : "border-slate-200"
            }`}
          />

          {/* {!isGroup && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          )} */}
        </div>

        <div className="flex flex-col justify-center">
          <h2 className={`text-base font-bold leading-tight ${theme.text}`}>
            {isGroup
              ? selectedChat.chatName
              : getSenderName(user, selectedChat.users)}
          </h2>

          <p className={`text-xs transition-all duration-200 ${statusColor}`}>
            {statusText}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          className={`p-2.5 rounded-full transition-colors ${theme.sidebarIconInactive}`}
        >
          <Info size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
