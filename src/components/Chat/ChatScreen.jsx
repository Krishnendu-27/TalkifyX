import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  Smile,
  Paperclip,
  Send,
  Mic,
  Check,
  CheckCheck,
  Image as ImageIcon,
} from "lucide-react";
import { useTheme } from "../../theme/Theme";
import { Image } from "../../assets/image"; // Assuming you have default avatar here

const ChatScreen = () => {
  const { id } = useParams(); // Get chat ID from URL
  const navigate = useNavigate();
  const theme = useTheme();
  const messagesEndRef = useRef(null);
  const [messageInput, setMessageInput] = useState("");

  // Mock Data - Replace with actual data fetching logic
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! How are you doing?",
      sender: "them",
      time: "10:00 AM",
      status: "read",
    },
    {
      id: 2,
      text: "I'm good, just working on this React project. It's coming along nicely!",
      sender: "me",
      time: "10:02 AM",
      status: "read",
    },
    {
      id: 3,
      text: "That sounds awesome. Are you using Tailwind?",
      sender: "them",
      time: "10:03 AM",
      status: "read",
    },
    {
      id: 4,
      text: "Yes! Tailwind and Lucide icons. The dark mode support is tricky though.",
      sender: "me",
      time: "10:05 AM",
      status: "delivered",
    },
    {
      id: 5,
      text: "You'll figure it out. Let me know if you need help.",
      sender: "them",
      time: "10:06 AM",
      status: "read",
    },
    {
      id: 6,
      text: "Thanks! Will do.",
      sender: "me",
      time: "10:08 AM",
      status: "sent",
    },
  ]);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: messageInput,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      {/* --- HEADER --- */}
      <div
        className={`
        h-16 px-4 flex items-center justify-between z-10
        border-b ${theme.divider} ${theme.navBg} backdrop-blur-md
      `}
      >
        <div className="flex items-center gap-3">
          {/* Back Button (Mobile Only) */}
          <button
            onClick={() => navigate("/")}
            className={`md:hidden p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 ${theme.text}`}
          >
            <ArrowLeft size={22} />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={Image.defaultUser} // Replace with dynamic user image
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span
                className={`font-semibold text-sm md:text-base ${theme.text}`}
              >
                User Name {id}
              </span>
              <span className={`text-xs ${theme.textMuted}`}>Online</span>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1 md:gap-3">
          <button
            className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 ${theme.sidebarIconInactive}`}
          >
            <Video size={20} />
          </button>
          <button
            className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 ${theme.sidebarIconInactive}`}
          >
            <Phone size={20} />
          </button>
          <button
            className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 ${theme.sidebarIconInactive}`}
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* --- CHAT BACKGROUND (Optional: Add a pattern image here) --- */}
      <div
        className={`absolute inset-0 z-0 opacity-5 pointer-events-none ${
          theme.divider === "border-slate-200"
            ? "bg-grid-slate-800"
            : "bg-grid-slate-200"
        }`}
      />

      {/* --- MESSAGES AREA --- */}
      <div
        className={`
        flex-1 overflow-y-auto p-4 space-y-4 z-0 
        ${theme.mainBg} 
        custom-scrollbar
      `}
      >
        {messages.map((msg) => {
          const isMe = msg.sender === "me";
          return (
            <div
              key={msg.id}
              className={`flex w-full ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  relative max-w-[85%] md:max-w-[70%] lg:max-w-[60%] px-4 py-2 rounded-xl shadow-sm text-sm md:text-[15px]
                  ${
                    isMe
                      ? "bg-cyan-600 text-white rounded-tr-none"
                      : `${theme.sidebarBg} ${theme.text} border ${theme.divider} rounded-tl-none`
                  }
                `}
              >
                <p className="leading-relaxed break-words pb-4 md:pb-2">
                  {msg.text}
                </p>

                {/* Meta: Time & Status */}
                <div
                  className={`
                  absolute bottom-1 right-2 flex items-center gap-1 text-[10px] 
                  ${isMe ? "text-cyan-100" : theme.textMuted}
                `}
                >
                  <span>{msg.time}</span>
                  {isMe && (
                    <span>
                      {msg.status === "sent" && <Check size={14} />}
                      {msg.status === "delivered" && <CheckCheck size={14} />}
                      {msg.status === "read" && (
                        <CheckCheck size={14} className="text-blue-300" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {/* Invisible div to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* --- INPUT AREA --- */}
      <div
        className={`
        p-3 md:p-4 z-10
        ${theme.navBg} border-t ${theme.divider}
      `}
      >
        <form
          onSubmit={handleSendMessage}
          className="flex items-end gap-2 md:gap-3 max-w-4xl mx-auto w-full"
        >
          {/* Attachments / Emoji (Desktop) */}
          <div className="hidden md:flex gap-2 mb-2">
            <button
              type="button"
              className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 ${theme.textMuted}`}
            >
              <Smile size={22} />
            </button>
            <button
              type="button"
              className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 ${theme.textMuted}`}
            >
              <Paperclip size={22} />
            </button>
          </div>

          {/* Mobile Attachment (Simplified) */}
          <button
            type="button"
            className={`md:hidden mb-2 p-2 rounded-full hover:bg-black/5 ${theme.textMuted}`}
          >
            <ImageIcon size={22} />
          </button>

          {/* Text Input */}
          <div
            className={`
            flex-1 flex items-center gap-2 rounded-2xl px-4 py-3 border
            ${theme.sidebarBg} ${theme.divider}
          `}
          >
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              className={`
                w-full bg-transparent border-none outline-none text-sm md:text-base resize-none 
                ${theme.text} placeholder:${theme.textMuted}
              `}
            />
          </div>

          {/* Send / Mic Button */}
          <button
            type="submit"
            className={`
              mb-1 p-3 rounded-full flex items-center justify-center transition-all duration-200
              ${
                messageInput.trim()
                  ? "bg-cyan-500 text-white shadow-lg hover:bg-cyan-600"
                  : `${theme.sidebarBg} ${theme.text} border ${theme.divider} hover:bg-black/5`
              }
            `}
          >
            {messageInput.trim() ? (
              <Send size={20} className="ml-0.5" /> // Slight offset for visual center
            ) : (
              <Mic size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
