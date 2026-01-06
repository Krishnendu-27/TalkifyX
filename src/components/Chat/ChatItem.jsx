import { CheckCheck } from "lucide-react";
import { useTheme } from "../../theme/Theme";

export const ChatItem = ({ chat, user, onClick }) => {
  const theme = useTheme();
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-4 cursor-pointer ${theme.cardBg} transition`}
    >
      {/* Avatar */}
      <img
        src={user.avatar}
        alt={user.username}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold truncate">{user.username}</h3>

          <span className={`text-xs ${theme.textMuted}`}>
            {new Date(chat.latestMessage?.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Latest Message */}
        <div className={`flex items-center gap-2 text-sm ${theme.textMuted}`}>
          <CheckCheck size={16} />
          <p className="truncate">
            {chat.latestMessage?.content || "No messages yet"}
          </p>
        </div>
      </div>
    </div>
  );
};
