import React from "react";
import { CheckCheck, MessageSquarePlus } from "lucide-react";
import { ChatItem } from "./ChatItem";
import ChatNotFound from "./ChatNotFound";
import ChatListSkeleton from "../Loaders/ChatListSkeleton";
import useChatStore from "../../stores/useChatStore";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useThemeStore } from "../../stores/useThemeStore";

const ChatList = ({ chats, theme }) => {
  const { setSelectedChat, selectedChat, isLoadingChats, isLoadingMessages } =
    useChatStore();

  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const navigate = useNavigate();

  const handleSelectChat = (chat) => {
    if (selectedChat?._id === chat._id) return;
    setSelectedChat(chat);
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    // <motion.div
    //   initial={{
    //     x: -50,
    //   }}
    //   animate={{
    //     x: 0,
    //   }}
    //   className={`w-full h-full ${theme.bg} ${theme.text} overflow-y-auto`}
    // >
    //   {isLoadingChats ? (
    //     <ChatListSkeleton />
    //   ) : !chats.length ? (
    //     <ChatNotFound />
    //   ) : (
    //     chats.map((chat) => (
    //       <motion.div
    //         key={chat._id}
    //         whileTap={{ scale: 0.97 }}
    //         transition={{ type: "spring", stiffness: 400, damping: 17 }}
    //       >
    //         <Link to="/chat">
    //           <ChatItem
    //             chat={chat}
    //             user={chat.users[1]}
    //             onClick={() => handleSelectChat(chat)}
    //           />
    //         </Link>
    //       </motion.div>
    //     ))
    //   )}

    //   <div className="h-10 w-10 bg-sky-500 absolute ">
    //     <MessageSquarePlus />
    //   </div>
    // </motion.div>
    <>
      <motion.div variants={listVariants} initial="hidden" animate="visible">
        {isLoadingChats ? (
          <ChatListSkeleton />
        ) : !chats.length ? (
          <ChatNotFound />
        ) : (
          chats.map((chat) => (
            <motion.div
              key={chat._id}
              variants={itemVariants}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link to="/chat">
                <ChatItem
                  chat={chat}
                  user={chat.users[1]}
                  onClick={() => handleSelectChat(chat)}
                />
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
      <motion.div
        variants={itemVariants}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/create")}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`
    h-14 w-14 absolute right-5 bottom-24 md:hidden
    rounded-xl shadow-lg
    flex items-center justify-center
    transition-colors duration-300
    ${
      isDarkMode
        ? "bg-gradient-to-br from-cyan-600/90 to-blue-700/90 shadow-cyan-500/20"
        : "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/30"
    }
  `}
      >
        <MessageSquarePlus
          size={28}
          className={isDarkMode ? "text-white" : "text-white"}
        />
      </motion.div>
    </>
  );
};
export default ChatList;
