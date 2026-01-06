import React from "react";
import SplitPane from "../../components/Layout/SplitPane";
import ChatListSidebar from "./ChatListSidebar";

const ChatLayout = () => {
  // We pass the "Left Side" content as a prop
  // basePath must match the route defined in your router for this page
  return <SplitPane basePath="/" leftContent={<ChatListSidebar />} />;
};

export default ChatLayout;
