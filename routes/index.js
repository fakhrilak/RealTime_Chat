const express = require('express');
const router = express.Router();

const {private} = require("../controllers/private")
const {grup} = require("../controllers/grup")
const { delet_collections } =  require("../controllers/delet_collections")

module.exports = function(io){
    io.on("connection",socket=>{
        socket.on('message',async(data)=>{
            if (data.type === "private"){
                await private(data)

            }else if(data.type === "grup"){
                await grup(data)
            }
        })
        socket.on("delet",()=>{
            delet_collections()
        })
    })

    return router
}