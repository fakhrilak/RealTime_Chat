const { findOne, create, update_One, updateMessage } = require("./configmongo");

exports.private = async (data) => {
  try {
    // console.log(data, "ok");
    const db = "test";
    collection = "log_messages"
    const newdata = await findOne(db, collection, {
      users: data.users,
    });

    // console.log(newdata, "client");

    const revers = [...data.users].sort((a, b) => {
      return a - b;
    });
    const newdata_revers = await findOne(db, collection, {
      users: revers,
    });


    if (newdata) {
      // console.log("biasa");
      // await update_One(db, collection, data);
      await updateMessage(db, collection, data);

    } else if (newdata_revers) {
      data.users = revers;
      // await update_One(db, collection, data);
      await updateMessage(db, collection, data);

    } else if (!newdata && !newdata_revers) {
      var create_grup = {
        room_id: data.room_id,
        type: data.type,
        users: data.users,
        messages: data.message,
      };
      await create(db, collection, create_grup);
    }
  } catch (e) {}
};



type = {
  type: "group",
  name: ""
}