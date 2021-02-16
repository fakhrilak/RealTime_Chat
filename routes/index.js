const express = require('express');
const router = express.Router();

const {private} = require("../controllers/private")
const {grup} = require("../controllers/grup")
const { delet_collections } =  require("../controllers/delet_collections")
const {getChat} = require("../controllers/getChat")

module.exports = function(io){
    io.on("connection",socket=>{
        socket.on('message',async(data)=>{
            if (data.type === "private"){
                console.log(data.message, 'data')
                await private(data)

                // socket.emit(data[0].message[0])
            }else if(data.type === "grup"){
                await grup(data)
            }
        })
        socket.on("getChat_rooms",async(data)=>{
            console.log(data, 'xixixi')
            socket.broadcast.emit("Give_Chat",await getChat(data))
        })
        socket.on("delet",()=>{
            delet_collections()
        })
    })

    return router
}