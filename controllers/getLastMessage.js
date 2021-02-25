const { getLastMessage } = require("./configmongo");

exports.getChatByRoomId = async (room_id) => {
  const lastMessage = await getLastMessage("test", "log_messages", room_id);
  return lastMessage;
};
