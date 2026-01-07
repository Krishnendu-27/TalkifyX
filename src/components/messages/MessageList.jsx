import React, { useEffect, useRef, useMemo } from "react";
import useChatStore from "../../stores/useChatStore";
import useAuthStore from "../../stores/useAuthStore";
import MessageItem from "./MessageItem";
import { isSameSender, isLastMessage } from "../../util/chatLogic";

const MessageList = () => {
  const { messages } = useChatStore();
  const { user } = useAuthStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderedMessages = useMemo(() => {
    if (!messages || !user) return null;

    return messages.map((m, i) => {
      const isMyMessage = m.sender._id === user._id;
      const showAvatar =
        !isMyMessage &&
        (isSameSender(messages, m, i, user._id) ||
          isLastMessage(messages, i, user._id));

      return (
        <MessageItem
          key={m._id}
          message={m}
          isMyMessage={isMyMessage}
          showAvatar={showAvatar}
        />
      );
    });
  }, [messages, user]);

  return (
    <div className="flex flex-col p-4 pb-2">
      {renderedMessages}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
