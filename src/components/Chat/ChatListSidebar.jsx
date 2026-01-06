import React from "react";
import { Search } from "lucide-react";
import { useTheme } from "../../theme/Theme";
import { data, Link } from "react-router-dom";
import useChatStore from "../../stores/useChatStore";
import ChatList from "./ChatList";

const ChatListSidebar = () => {
  const theme = useTheme();
  const { chats, selectedChat, setSelectedChat, isLoadingChats } = useChatStore();

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header / Search */}
      <div className={`p-4 border-b ${theme.divider}`}>
        <h1 className={`text-xl font-bold mb-4 ${theme.text}`}>Chats</h1>
        <div
          className={`flex items-center px-4 py-2 rounded-lg border ${theme.divider} ${theme.navBg}`}
        >
          <Search size={20} className={theme.textMuted} />
          <input
            type="text"
            placeholder="Search or start new chat"
            className={`bg-transparent border-none outline-none ml-3 w-full text-sm ${theme.text}`}
          />
        </div>
      </div>

      {/* Scrollable List Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <ChatList
          chats={chats}
          theme={theme}
          onSelectChat={(chat) => console.log(chat)}
        />

        {/* {chats.map((i) => (
          <Link key={i} to={`/chat/${i}`}>
            <div
              className={`p-4 border-b hover:bg-black/5 cursor-pointer ${theme.divider}`}
            >
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0" />
                <div>
                  <h4 className={`font-semibold ${theme.text}`}>
                    User Name {i}
                  </h4>
                  <p className={`text-sm ${theme.textMuted} line-clamp-1`}>
                    Hey, how are you doing today? This is a preview...
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))} */}
      </div>
    </div>
  );
};

export default ChatListSidebar;
