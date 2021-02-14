const {findOne,create,update_One} = require("./configmongo")
exports.private=async(data)=>{
  try{
    const db = "chat_app"
    const newdata =  await findOne(
        db,
        "private",
        {
          Users : data.Users
        }
        )
    const revers = [...data.Users].sort((a,b)=>{
        return a - b
    })
    const newdata_revers =  await findOne(
      db,
      "private",
      {
        Users : revers
      }
      )
    console.log(newdata_revers)
   // console.log(newdata_revers,newdata,data.Users)
    if (newdata){
      console.log("biasa")
      await update_One(db,"private",data)
    }else if(newdata_revers){
      data.Users = revers
      await update_One(db,"private",data)
    }else if (!newdata && !newdata_revers) {
      
      var create_grup = {
              type: data.type,
              created_time: data.created_time,
              last_Message: data.last_Message,
              Users :data.Users,
              message : data.message
            }
      await create(db,"private",create_grup)
    }
  
  }catch(e){

  }
}