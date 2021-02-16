const { findOne, create, update_One, updateMessage } = require("./configmongo");

exports.private = async (data) => {
  try {
    console.log(data, "ok");
    const db = "chat_app";
    const newdata = await findOne(db, "private", {
      Users: data.Users,
    });

    console.log(newdata, "client");

    const revers = [...data.Users].sort((a, b) => {
      return a - b;
    });
    const newdata_revers = await findOne(db, "private", {
      Users: revers,
    });

    console.log(newdata_revers, "jjj");

    if (newdata) {
      console.log("biasa");
      await update_One(db, "private", data);
      await updateMessage(db, "private", data);
      
    } else if (newdata_revers) {
      data.Users = revers;
      await update_One(db, "private", data);
      await updateMessage(db, "private", data);

    } else if (!newdata && !newdata_revers) {
      console.log(data.message, "helllo");
      var create_grup = {
        type: data.type,
        created_time: data.created_time,
        last_Message: data.last_Message,
        Users: data.Users,
        message: data.message,
      };
      await create(db, "private", create_grup);
    }
  } catch (e) {}
};
