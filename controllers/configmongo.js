var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.findOne = async (databases, coll, data) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(databases);

    // console.log(data, 'dataaa')

    let collection = db.collection(coll);
    let res = await collection.findOne(data);

    // console.log(res)

    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

exports.findAll = async (databases, coll, data) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(databases);

    let collection = db.collection(coll);

    let res = await collection.find({ users: data.users }).toArray();
    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

exports.create = async (databases, coll, data) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    let db = client.db(databases);

    let collection = db.collection(coll);

    await collection.insertOne(data);

    let res = await collection.find(data).toArray();

    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

exports.update_One = async (databases, coll, data) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    let db = client.db(databases);

    let collection = db.collection(coll);

    var newvalues = {
      $set: {
        last_Message: data.last_Message,
        last_time_message: data.last_time_message,
      },
    };
    await collection.updateOne({ users: data.users }, newvalues);
    let result = await collection.findOne({}, data);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

exports.updateMessage = async (databases, coll, data) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    let db = client.db(databases);

    let collection = db.collection(coll);
    // console.log(data, "updatemess");

    if (data.type.type === "group") {
      console.log(data)
      const query = { room_id: data.room_id };
      const newValues = {
        $push: {
          messages: {
            $each: data.messages,
            $position: 0,
          },
        },
      };
      const update = await collection.updateOne(query, newValues);
      console.log(update)
    } else {
      const query = { users: data.users };
      const newValues = {
        $push: {
          messages: {
            $each: data.messages,
            $position: 0,
          },
        },
      };

      const up = await collection.updateOne(query, newValues);
      console.log(up)
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

exports.getLastMessage = async (databases, coll, room_id) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    console.log(databases, coll, room_id, "da");
    let db = client.db(databases);
    let collection = db.collection(coll);

    const listChat = await collection.findOne({ room_id: room_id });
    // const anotheruser = users.find(i => i !== user_id)
    const senderChat = await client
      .db("test")
      .collection("users")
      .findOne({ user_id: listChat.messages[0].sender.toString() });
    // console.log(listChat.messages[0]);
    console.log(senderChat, "kkkk");
    const result = {
      room_id: listChat.room_id,
      last_message: {
        text: listChat.messages[0].text,
        user: {
          _id: 2,
        },
        createdAt: listChat.messages[0].createdAt,
        _id: listChat.messages[0]._id,
        sender: listChat.messages[0].sender,
        type: listChat.messages[0].type,
      },
      type: {
        type: listChat.type.type,
        room_name: listChat.type.room_name,
      },
      sender: {
        user_id: senderChat.user_id,
        picture: senderChat.picture,
        name: senderChat.name,
      },
    };

    return result;
  } catch (error) {
    console.log(error, "error");
  }
};

exports.getListRoomByUserId = async (databases, coll, user_id) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    let db = client.db(databases);
    console.log(user_id, "id");

    let collection = db.collection(coll);

    const rooms = await collection.find({}).toArray();
    const listRoom = [];

    for (let i = 0; i < rooms.length; i++) {
      for (let j = 0; j < rooms[i].users.length; j++) {
        if (rooms[i].type.type === "private") {
          const anotheruser = rooms[i].users.find(
            (id) => parseInt(id) !== parseInt(user_id)
          );

          if (parseInt(rooms[i].users[j]) === parseInt(user_id)) {
            let list_rooms = {
              room_id: rooms[i].room_id,
              last_message: rooms[i].messages.length
                ? rooms[i].messages[0]
                : null,
              type: rooms[i].type,
            };

            const sender = await client
              .db("test")
              .collection("users")
              .findOne({ user_id: anotheruser.toString() });
            console.log(sender, "sender");
            const filterSenderData = {
              user_id: sender.user_id,
              picture: sender.picture,
              name: sender.name,
            };

            list_rooms.sender = filterSenderData;

            listRoom.push(list_rooms);
          }
        } else if (rooms[i].type.type === "group") {
          if (parseInt(rooms[i].users[j]) === parseInt(user_id)) {
            let list_rooms = {
              room_id: rooms[i].room_id,
              last_message: rooms[i].messages.length
                ? rooms[i].messages[0]
                : [],
              type: rooms[i].type,
              group_name: rooms[i].type.room_name,
            };

            const sender = rooms[i].messages.length
              ? await client.db("test").collection("users").findOne({
                  user_id: rooms[i].messages[0].sender.toString(),
                })
              : {};
            const filterSenderData = {
              user_id: sender.user_id,
              picture: sender.picture,
              name: sender.name,
            };

            list_rooms.sender = filterSenderData;

            listRoom.push(list_rooms);
          }
        }
      }
    }

    console.log(listRoom, "pppp");
    return listRoom;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};
