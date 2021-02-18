var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.findOne = async (databases, coll, data) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(databases);

    let collection = db.collection(coll);

    let res = await collection.findOne(data);
    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

exports.findAll = async (databases, coll, data) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(databases);

    let collection = db.collection(coll);

    let res = await collection.find({ users: data.users }).toArray();

    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

exports.create = async (databases, coll, data) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    let db = client.db(databases);

    let collection = db.collection(coll);

    await collection.insertOne(data);

    let res = await collection.find(data).toArray();
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

exports.update_One = async (databases, coll, data) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    let db = client.db(databases);

    let collection = db.collection(coll);

    var newvalues = { $set: { last_Message: data.last_Message } };
    await collection.updateOne({ users: data.users }, newvalues);
    let result = await collection.findOne({}, data);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

exports.updateMessage = async (databases, coll, data) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    console.log(err);
  });

  if (!client) {
    return;
  }

  try {
    let db = client.db(databases);

    let collection = db.collection(coll);
    const logMessage = await collection.findOne({ users: data.users });

    console.log(data, 'pp')

    const query = { users: data.users };
    const newValues = { $push: { messages: {
        $each: data.message,
        $position: 0
    } } };

    await collection.updateOne(query, newValues);
    
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};
