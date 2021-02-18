const {findOne,create,update_One,updateMessage} = require("./configmongo")
exports.private=async(data)=>{
  try{
    const db = "chat_app"

    const newdata =  await findOne(
        db,"private",{
        Users : data.Users})

    const revers = [...data.Users].sort((a,b)=>{
        return a - b
    })

    const newdata_revers =  await findOne(
      db,"private",{
        Users : revers
      })
      
    if (newdata){

      await update_One(db,"private",data)
      await updateMessage(db, "private", data);

    }else if(newdata_revers){
      //rivers digunakan nuntuk mendeteksi user chat pertama kali, kemungkinan bisa dari user a atau b,
      //jika yg tertulis di databases a chat b duluan maka data [a,b], agar tidak membuat roomchat baru
      //kita membutuhkan rivers ini
      data.Users = revers
      await update_One(db,"private",data)
      await updateMessage(db, "private", data)

    }else if (!newdata && !newdata_revers) {
      
      var create_grup = {
              type: data.type,
              created_time: data.created_time,
              last_Message: data.last_Message,
              Users :data.Users,
              last_time_message:data.last_time_message,
              message : data.message
            }
      await create(db,"private",create_grup)
  }
  }catch(e){

  }
}

exports.Get_Chat=async(data)=>{
    try{
      const db = "chat_app"
      const newdata =  await findOne(
          db,data.type,{
            Users : data.data
          })
      return newdata.message
    }catch(e){

    }

}