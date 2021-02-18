const express = require("express");
const router = express.Router();

const { private } = require("../controllers/private");
const { grup } = require("../controllers/grup");
const { delet_collections } = require("../controllers/delet_collections");
const { getChat } = require("../controllers/getChat");

const connectedClient = [];

function userRoom(id, room_id) {
  const user = { id, room_id };
  const checkSocketId = connectedClient.filter((i) => i.id === id);

  if (!checkSocketId.length) {
    connectedClient.push(user);
  }
}

function searchRoomToEmitMessage(room_id) {
  //   const userToEmit = connectedClient.filter((item) => item.room_id === room_id).map(id => id.id);
  const userToEmit = connectedClient
    .filter((item) => item.room_id === room_id)
    .map((id) => id.id);

  return userToEmit;
}

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("message", async (data) => {
      if (data.type.type === "private") {
          console.log(data)
        userRoom(socket.id, data.room_id);
        const listSocketId = searchRoomToEmitMessage(data.room_id);
        console.log(listSocketId);

        for (let socketid of listSocketId) {
          io.to(socketid).emit(
            "received-message",
            data.message[0]
          );
        }

        await private(data);
      } else if (data.type === "grup") {
        await grup(data);
      }
    });
    socket.on("getChat_rooms", async (data) => {
      socket.broadcast.emit("Give_Chat", await getChat(data));
    });
    socket.on("delet", () => {
      delet_collections();
    });
  });

  return router;
};
