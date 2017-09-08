var {MongoClient} = require('mongodb');

MongoClient.connect('mongodb:localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log(err);
  }
  console.log("Connected Succesfully");

  var collection = db.collection('Todos');

  collection.findOneUpdateOne()
});
