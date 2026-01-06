import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../../theme/Theme";

/**
 * SplitPane Component
 * @param {ReactNode} leftContent - The content for the left list (Search, Chat Items, etc.)
 * @param {string} basePath - The root path for this section (e.g., "/", "/group", "/profile")
 */
const SplitPane = ({ leftContent, basePath }) => {
  const theme = useTheme();
  const location = useLocation();

  // Logic: If URL is exactly the base path, we are in "List Mode".
  // If URL is deeper (e.g., "/chat/123"), we are in "Detail Mode".
  // Note: We strip trailing slashes for safer comparison
  const currentPath = location.pathname.replace(/\/+$/, "");
  const base = basePath.replace(/\/+$/, "");

  const isDetailPage = currentPath !== base;

  return (
    <div className="flex w-full h-full">
      {/* --- LEFT PANE (The List) --- */}
      {/* Mobile Logic: Hidden if we are on a detail page.
         Desktop Logic: Always Flex (w-full on mobile default, fixed width on desktop)
      */}
      <div
        className={`
          flex-col h-full border-r ${theme.divider} transition-all duration-300
          w-full md:w-[320px] lg:w-[380px] xl:w-[420px] 
          ${theme.sidebarBg}
          ${isDetailPage ? "hidden md:flex" : "flex"} 
        `}
      >
        {/* Render the specific list content (Search bar, Chat cards) passed as prop */}
        {leftContent}
      </div>

      {/* --- RIGHT PANE (The Conversation/Detail) --- */}
      {/* Mobile Logic: Hidden if we are on the list page (base path).
         Desktop Logic: Always Flex (takes remaining space)
      */}
      <div
        className={`
          flex-1 h-full flex-col relative
          ${theme.mainBg}
          ${!isDetailPage ? "hidden md:flex" : "flex"}
        `}
      >
        {/* This Outlet renders the child route.
          e.g., The <ChatScreen> or <EmptyState> component 
        */}
        <Outlet />
      </div>
    </div>
  );
};

export default SplitPane;
