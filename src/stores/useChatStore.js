import { create } from "zustand";

// Mock Data
const MOCK_CONTACTS = [
  {
    id: 1,
    name: "Elizabeth Olsen",
    role: "Junior Developer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    lastMessage: "Can you send me the report?",
    time: "8:30 AM",
    unread: 0,
    status: "online",
  },
  {
    id: 2,
    name: "Brad Forst",
    role: "Product Manager",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150",
    lastMessage: "Message for brad frost",
    time: "10:46 AM",
    unread: 1,
    status: "offline",
  },
  {
    id: 3,
    name: "Paul Irish",
    role: "Designer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    lastMessage: "Message for Paul Irish",
    time: "09:06 AM",
    unread: 0,
    status: "offline",
  },
];

const MOCK_MESSAGES = [
  { id: 1, senderId: 2, text: "That's Great", time: "Yesterday", type: "text" },
  {
    id: 2,
    senderId: "me",
    text: "I am refer to the project structure and found some mistakes",
    time: "Yesterday",
    type: "text",
  },
  {
    id: 3,
    senderId: "me",
    text: "There are some bugs in this project",
    time: "Yesterday",
    type: "text",
  },
  {
    id: 4,
    senderId: 1,
    text: "I see that project",
    time: "Today, 8:00 AM",
    type: "text",
  },
  {
    id: 5,
    senderId: 1,
    text: "Yes there are many bugs in that project",
    time: "Today, 8:02 AM",
    type: "text",
  },
  {
    id: 6,
    senderId: 1,
    text: "Report.PDF",
    size: "2.4 MB",
    time: "Today, 8:05 AM",
    type: "file",
  },
  {
    id: 7,
    senderId: "me",
    text: "Can you send me the report",
    time: "Today, 8:30 AM",
    type: "text",
  },
];

// Zustand Store
export const useChatStore = create((set) => ({
  activeContactId: 1,
  contacts: MOCK_CONTACTS,
  messages: MOCK_MESSAGES,
  currentUser: {
    name: "Gravid Christofer",
    role: "Senior Developer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  setActiveContact: (id) => set({ activeContactId: id }),
  addMessage: (text) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now(),
          senderId: "me",
          text,
          time: "Just now",
          type: "text",
        },
      ],
    })),
}));
