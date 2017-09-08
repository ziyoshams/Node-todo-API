var {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log("Unable to connect", err);
  }

  console.log("Connected Succesfully");
  db.collection('Todos').find({}).count().then((count)=>{
    console.log(count);
  });

  db.close();
});
