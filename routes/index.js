const express = require('express');
const router = express.Router();

const {private,Get_Chat} = require("../controllers/private")
const {grup} = require("../controllers/grup")
const { delet_collections } =  require("../controllers/delet_collections")
const {getChat} = require("../controllers/getChat")

module.exports = function(io){
    io.on("connection",socket=>{

        socket.on('message',async(data)=>{
            if (data.type.type === "private"){
                await private(data)
                socket.broadcast.emit("Give_Chat"+String(data.Users[0]),
                await getChat(parseInt(data.Users[0]))
                )
                socket.broadcast.emit("Give_Chat"+String(data.Users[1]),
                await getChat(parseInt(data.Users[1]))
                )
            }else if(data.type.type === "grup"){
                await grup(data)
            }
        })

        socket.on("getChat_rooms",async(data)=>{
            socket.emit("Give_Chat",await getChat(data))
        })

        socket.on("get_Message",async(data)=>{
            socket.broadcast.emit("give_Chat"+String(data.param),
                await Get_Chat(data)
            )
            console.log(data, 'xixixi')
            socket.broadcast.emit("Give_Chat",await getChat(data))
        })

        socket.on("delet",()=>{
            delet_collections()
        })
        
        socket.on("disconnect",data=>{
            //console.log("1 user disconnect")
        })

    })
    return router
}