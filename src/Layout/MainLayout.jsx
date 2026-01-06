// import Sidebar from "../components/Chat/Sidebar";
// import { useTheme } from "../theme/Theme";
// import { Outlet } from "react-router-dom";

// const ChatLayout = () => {
//   const theme = useTheme();

//   return (
//     <div
//       className={`flex h-screen w-screen overflow-hidden ${theme.bg} ${theme.text} transition-colors duration-300`}
//     >
//       <Sidebar />
//       <main className="flex-1 h-full relative flex">
//         <div className="flex-1 flex items-center justify-center h-full">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ChatLayout;

import React from "react";
import Sidebar from "../components/Chat/Sidebar";
import { useTheme } from "../theme/Theme";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const theme = useTheme();

  return (
    // Outer container: Flex row to place Sidebar next to content
    // <div
    //   className={`flex h-screen w-full overflow-hidden ${
    //     theme.bg || "bg-gray-50"
    //   }`}
    // >
    //   {/* 1. Global Navigation (The icon strip) */}
    //   <Sidebar />

    //   {/* 2. Main Content Area */}
    //   {/* Flex-1 ensures it takes remaining width. Relative for positioning context */}
    //   <main className="flex-1 h-full relative flex flex-col min-w-0">
    //     <Outlet />
    //   </main>
    // </div>
    <div
      className={`flex h-screen w-screen overflow-hidden ${theme.bg} ${theme.text} transition-colors duration-300`}
    >
      <Sidebar />
      <main className="flex-1 h-full relative flex">
        <div className="flex-1 flex items-center justify-center h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
