const { findOne, create, update_One, updateMessage } = require("./configmongo");
exports.private = async (data) => {
  try {
    const db = "test";
    console.log(data.users);
    const users = [...data.users]

    const newdata = await findOne(db, "log_messages", {
      users: data.users,
    });
    const newdata_revers = await findOne(db, "log_messages", {
      users: users.reverse(),
    });

    if (newdata) {
      console.log(data, "new");

      // await update_One(db,"private",data)
      await updateMessage(db, "log_messages", data);
    } else if (newdata_revers) {
      data.users = data.users.reverse();
      console.log(data, "dataaaa");

      // await update_One(db,"log_messages",data)
      await updateMessage(db, "log_messages", data);

    } else if (!newdata && !newdata_revers) {
      var create_grup = {
        type: data.type,
        users: data.users,
        messages: data.messages,
        room_id: data.room_id,
      };
      await create(db, "log_messages", create_grup);
    }
  } catch (e) {}
};

exports.Get_Chat = async (data) => {
  try {
    const db = "chat_app";
    const newdata = await findOne(db, data.type, {
      users: data.data,
    });
    return newdata.message;
  } catch (e) {}
};
