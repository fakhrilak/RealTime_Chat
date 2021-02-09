var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
exports.private=(data)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("chat_app");
        var newdata = {
          fisrst_UserId:data.fisrst_UserId,
          second_userId:data.second_UserId,
          roomId:data.roomId
        }
        dbo.collection("private").find(newdata,(err,result)=>{
          if (err){
              throw err;
          }
          console.log(result.name)
          db.close()
      })
        // dbo.collection("private").insertOne(newdata, function(err, res) {
        //   if (err) throw err;
        //   console.log("1 document inserted private");
        //   db.close();
        // });
      });
}