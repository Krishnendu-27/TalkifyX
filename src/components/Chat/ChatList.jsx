import React from "react";
import { CheckCheck } from "lucide-react";
import { ChatItem } from "./ChatItem";
import ChatNotFound from "./ChatNotFound";
import ChatListSkeleton from "../Loaders/ChatListSkeleton";
import useChatStore from "../../stores/useChatStore";
import { Link } from "react-router-dom";

const ChatList = ({ chats, theme }) => {
  var startChat;
  const { setSelectedChat, isLoadingChats } = useChatStore();

  return (
    <div className={`w-full h-full ${theme.bg} ${theme.text} overflow-y-auto`}>
      {isLoadingChats ? (
        <ChatListSkeleton />
      ) : chats.length === 0 ? (
        <ChatNotFound onStartChat={startChat} />
      ) : (
        chats.map((chat) => {
          return (
            <Link key={chat._id} to="/chat">
              <ChatItem
                chat={chat}
                user={chat.users[1]}
                onClick={() => setSelectedChat(chat)}
              />
            </Link>
          );
        })
      )}
    </div>
  );
};

export default ChatList;
