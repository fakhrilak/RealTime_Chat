var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
exports.grup=(data)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("chat_app");
        var newdata = {
          type:data.type,
          grup_name:data.grup_name,
          created_time :data.created_time
        }
        dbo.collection("grup").find(newdata,(err,result)=>{
          if (err){
              throw err;
          }
          console.log(result)
          db.close()
      })


        // dbo.collection("grup").insertOne(data, function(err, res) {
        //   if (err) throw err;
        //   console.log("1 document inserted grup");
        //   db.close();
        // });
      });
}