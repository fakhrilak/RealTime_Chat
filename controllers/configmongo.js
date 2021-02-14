var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.findOne=async(databases,coll,data)=>{
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
          .catch(err => { console.log(err); });
  
      if (!client) {
          return;
      }
  
      try {
  
          const db = client.db(databases);
  
          let collection = db.collection(coll);
            
          let res = await collection.findOne(data);
          return res
  
      } catch (err) {
  
          console.log(err);
      } finally {
  
          client.close();
      }
  }

  exports.findAll=async(databases,coll,data)=>{
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
          .catch(err => { console.log(err); });
  
      if (!client) {
          return;
      }
  
      try {
  
          const db = client.db(databases);
  
          let collection = db.collection(coll);
  
          let res = await collection.find({Users:data.Users}).toArray();
  
          return res
  
      } catch (err) {
  
          console.log(err);
      } finally {
  
          client.close();
      }
  }

  exports.create=async(databases,coll,data)=>{
  
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
          .catch(err => { console.log(err); });
  
      if (!client) {
          return;
      }
  
      try {
  
          let db = client.db(databases);
  
          let collection = db.collection(coll);
  
          await collection.insertOne(data);
  
          let res = await collection.find(data).toArray();
            console.log(res)
          return res
  
      } catch (err) {
  
          console.log(err);
      } finally {
  
          client.close();
      }
  }

  exports.update_One=async(databases,coll,data)=>{
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {

        let db = client.db(databases);

        let collection = db.collection(coll);

        var newvalues = { $set: {last_Message:data.last_Message} };
        await collection.updateOne({Users:data.Users},newvalues)
        let result = await collection.findOne({},data)
        return result

    } catch (err) {

        console.log(err);
    } finally {

        client.close();
    }
}