const { findOne, create, update_One, updateMessage } = require("./configmongo");

exports.grup = async (data) => {
  try {
    const db = "test";

    const newdata = await findOne(db, "log_messages", {
      room_id: data.room_id,
    });

    console.log(newdata, "new");

    await updateMessage(db, "log_messages", data);
    // if (newdata){

    //   await update_One(db,"grup",data)

    // }else if (!newdata) {
    //   // var create_grup = {
    //   //         type: data.type,
    //   //         created_time: data.created_time,
    //   //         last_Message: data.last_Message,
    //   //         admin : data.admin,
    //   //         Users : data.Users,
    //   //         messages:data.messages
    //   //       }
    //   // await create(db,"grup",create_grup)
    // }
  } catch (e) {}

  // MongoClient.connect(url, function(err, db) {
  //     if (err) throw err;
  //     var dbo = db.db("chat_app");
  //     var newdata = {
  //       type:data.type,
  //       grup_name:data.grup_name,
  //       created_time :data.created_time
  //     }
  //     var mongoQuery = false
  //     dbo.collection("grup").find({}, newdata).toArray()
  //     console.log(dbo)
  //     // var create_grup = {
  //     //   _id : data._id,
  //     //   type: data.type,
  //     //   created_time: data.created_time,
  //     //   last_Message: data.last_Message,
  //     //   admin : data.admin,
  //     // }
  //     // dbo.collection("grup").insertOne(create_grup, function(err, res) {
  //     //   if (err) throw err;
  //     //   console.log("1 document inserted grup");
  //     //   db.close();
  //     // });
  //   });
};
