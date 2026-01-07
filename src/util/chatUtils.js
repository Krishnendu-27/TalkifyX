import { Image } from "../assets/image";
export const getSender = (loggedUser, users) => {
  // for 1-on-1 chats
  if (!users || users.length < 2) return null;
  return users[0]._id === loggedUser?._id ? users[1] : users[0];
};

export const getSenderName = (loggedUser, users) => {
  const sender = getSender(loggedUser, users);
  return sender ? sender.username : "Unknown User";
};

export const getSenderImage = (loggedUser, users) => {
  const sender = getSender(loggedUser, users);
  return sender?.avatar || Image.defaultUser;
};
