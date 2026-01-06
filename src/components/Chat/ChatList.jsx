import React from "react";
import { CheckCheck } from "lucide-react";
import { ChatItem } from "./ChatItem";

const ChatList = ({ chats, onSelectChat, theme }) => {
  return (
    <div className={`w-full h-full ${theme.bg} ${theme.text} overflow-y-auto`}>
      {chats.map((chat) => {
        return (
          <ChatItem
            key={chat._id}
            chat={chat}
            user={chat.users[1]}
            onClick={() => onSelectChat(chat._id)}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
