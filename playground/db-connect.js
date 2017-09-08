//const MongoClient = require('mongodb').MongoClient;
//using ES6 object destructuring we can retrieve MongoClient and set it as a var from its object.
var {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
	if(error){
		return console.log('Unable to connect to mongoBD');
	}

	console.log('Connected to DB');


	db.collection('Todos').find({text: "shahnoza"}).toArray().then((docs)=>{
		console.log(docs);
	});

	db.close();
});
