const { findAll, getListRoomByUserId, getLastMessage } = require("./configmongo");

exports.getChat = async (user_id) => {
  const private = await getListRoomByUserId("test", "log_messages", user_id);
  return private;

  // const private = await findAll("test","log_messages", user_id)

  // const grup = await findAll("chat_app","grup",{Users:data})
  // return [...private,...grup]
};


