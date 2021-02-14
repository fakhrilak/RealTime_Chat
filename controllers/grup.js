const {findOne,create} = require("./configmongo")


exports.grup=async(data)=>{
  try{
    const db = "chat_app"
    console.log(data._id)
    const newdata =  await findOne(
        db,
        "grup",
        {_id:data._id}
        )

    if (newdata){
      console.log(newdata)
      console.log("hello")
    }else if (!newdata) {
      var a = 1
      a+= 1
      var create_grup = {
              _id : a,
              type: data.type,
              created_time: data.created_time,
              last_Message: data.last_Message,
              admin : data.admin,
            }
      console.log(await create(db,"grup",create_grup))
    }
  
  }catch(e){

  }
  
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
}

