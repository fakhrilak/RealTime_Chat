var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
exports.delet_collections=()=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("chat_app");
        dbo.collection("grup").drop(function(err, delOK) {
          if (err){
              throw err
          };
          if (delOK) {
          db.close();
          }
        });
        dbo.collection("private").drop(function(err, delOK) {
            if (err){
                throw err
            };
            if (delOK) {
            db.close();
            }
          });
      });
}