import React from "react";
import { useTheme } from "../../theme/Theme";
import { useThemeStore } from "../../stores/useThemeStore";

const ChatListSkeleton = () => {
  const isDark = useThemeStore((state) => state.isDarkMode);

  const shimmerColor = isDark ? "bg-white/5" : "bg-slate-200";

  return (
    <div className="flex flex-col w-full h-full p-2 space-y-2 overflow-hidden">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`
            flex items-center gap-3 p-3 rounded-xl w-full animate-pulse
            ${isDark ? "border border-white/5" : "border border-transparent"}
          `}
        >
          <div
            className={`w-12 h-12 rounded-full flex-shrink-0 ${shimmerColor}`}
          />
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex justify-between w-full">
              <div className={`h-4 w-32 rounded-md ${shimmerColor}`} />
              <div className={`h-3 w-10 rounded-md ${shimmerColor}`} />
            </div>
            <div className={`h-3 w-48 rounded-md opacity-60 ${shimmerColor}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatListSkeleton;
