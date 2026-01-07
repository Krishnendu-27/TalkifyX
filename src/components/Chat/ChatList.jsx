import React from "react";
import { CheckCheck } from "lucide-react";
import { ChatItem } from "./ChatItem";
import ChatNotFound from "./ChatNotFound";
import ChatListSkeleton from "../Loaders/ChatListSkeleton";
import useChatStore from "../../stores/useChatStore";
import { Link } from "react-router-dom";

const ChatList = ({ chats, theme }) => {
  const { setSelectedChat, selectedChat, isLoadingChats } = useChatStore();

  const handleSelectChat = (chat) => {
    if (selectedChat?._id === chat._id) return;
    setSelectedChat(chat);
  };

  return (
    <div className={`w-full h-full ${theme.bg} ${theme.text} overflow-y-auto`}>
      {isLoadingChats ? (
        <ChatListSkeleton />
      ) : !chats.length ? (
        <ChatNotFound />
      ) : (
        chats.map((chat) => (
          <Link key={chat._id} to="/chat">
            <ChatItem
              chat={chat}
              user={chat.users[1]}
              onClick={() => handleSelectChat(chat)}
            />
          </Link>
        ))
      )}
    </div>
  );
};
export default ChatList;
