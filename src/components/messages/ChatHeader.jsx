import React from "react";
import { ArrowLeft, Info, MoreVertical, Phone, Video } from "lucide-react";
import useChatStore from "../../stores/useChatStore";
import useAuthStore from "../../stores/useAuthStore";
import { useTheme } from "../../theme/Theme";
import { getSender, getSenderImage, getSenderName } from "../../util/chatUtils";

const ChatHeader = () => {
  const theme = useTheme();
  const { selectedChat, setSelectedChat } = useChatStore();
  const { user } = useAuthStore();

  if (!selectedChat) return null;

  // LOGIC: Determine what to show
  // If it's a group chat, use the group name and image.
  // If it's a 1-on-1 chat, use the OTHER user's name and image.

  const isGroup = selectedChat.isGroupChat;

  const chatName = isGroup
    ? selectedChat.chatName
    : getSenderName(user, selectedChat.users);

  const chatImage = isGroup
    ? "https://cdn-icons-png.flaticon.com/512/166/166258.png"
    : getSenderImage(user, selectedChat.users);

  const chatStatus = isGroup
    ? `${selectedChat.users.length} members`
    : "Online";

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
          <ArrowLeft size={20} />
        </button>

        <div className="relative">
          <img
            src={chatImage}
            alt={chatName}
            className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/10"
          />

          {!isGroup && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
          )}
        </div>

        <div className="flex flex-col">
          <h2 className={`text-base font-bold leading-tight ${theme.text}`}>
            {chatName}
          </h2>
          <p className={`text-xs font-medium ${theme.textMuted}`}>
            {chatStatus}
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
