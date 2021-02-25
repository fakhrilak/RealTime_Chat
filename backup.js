const express = require("express");
const router = express.Router();

const { private } = require("../controllers/private");
const { grup } = require("../controllers/grup");
const { delet_collections } = require("../controllers/delet_collections");
const { getChat } = require("../controllers/getChat");
const { getChatByRoomId } = require("../controllers/getLastMessage");

const connectedClient = [];

function userRoom(id, room_id, user_id) {
  const user = { id, room_id, user_id };
  const checkSocketId = connectedClient.filter(
    (i) => parseInt(i.user_id) === parseInt(user_id)
  );

  // let index;
  // if (checkSocketId.length) {
  //   index = connectedClient.findIndex(
  //     (client) =>
  //       parseInt(client.user_id) === parseInt(checkSocketId[0].user_id)
  //   );
  // }
  // console.log(checkSocketId, "test", index);

  if (!checkSocketId.length) {
    connectedClient.push(user);
  } 
  // else if (room_id.length && checkSocketId.length) {
  //   connectedClient[0].room_id = room_id;
  // }
}

function searchRoomToEmitMessage(room_id) {
  console.log(room_id, connectedClient);
  const userToEmit = connectedClient
    .filter((item) => item.room_id === room_id)
    .map((id) => id.id);
  console.log(userToEmit, "hai");
  return userToEmit;
}


function userToEmitMessage(user_id) {
  console.log(user_id);
  const userToEmit = connectedClient
  .filter((item) => parseInt(item.room_id) === parseInt(user_id))
  .map((id) => id.id);
  console.log(userToEmit, "socketid");
  return userToEmit;
}


module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("join-room", async (room_id, user_id) => {
      userRoom(socket.id, room_id, user_id);
    });

    socket.on("chat", async (room_id, user_id) => {
      // saveConnectedClient(socket.id, user_id);
      userRoom(socket.id, room_id, user_id);
    });


    socket.on("message", async (data) => {
      if (data.type.type === "private") {
        // await private(data);

        console.log(data, "testaaaaaaaaaaaa");
        const users = data.users;

        // const socketidList = userToEmitMessage(data.receiver);
        // console.log(socketidList, "lalalal");
        // for (let socketid of socketidList) {
        //   io.to(socketid).emit(
        //     "current-message",
        //     await getChatByRoomId(data.room_id)
        //   );
        // }

        const listSocketId = searchRoomToEmitMessage(data.room_id);
        for (let socketid of listSocketId) {
          io.to(socketid).emit("received-message", {
            message: data.messages[0],
            room_id: data.room_id,
          });
        }
      } else if (data.type === "group") {
        const listSocketId = searchRoomToEmitMessage(data.room_id);

        for (let socketid of listSocketId) {
          io.to(socketid).emit("received-message", data.messages[0]);
        }

        await grup(data);
      }
    });
    socket.on("getChat_rooms", async (data) => {
      socket.emit("Give_Chat", await getChat(data));
    });

    socket.on("get_Message", async (data) => {
      socket.broadcast.emit(
        "give_Chat" + String(data.param),
        await Get_Chat(data)
      );

      socket.broadcast.emit("Give_Chat", await getChat(data));
    });

    socket.on("delet", () => {
      delet_collections();
    });

    socket.on("disconnect", (data) => {
      //console.log("1 user disconnect")
    });
  });

  return router;
};
