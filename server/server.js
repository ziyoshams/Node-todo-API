var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((docs)=>{
    res.send(docs);
  }, (e)=>{
    res.status(400).send(e);
  });


});

app.get('/todos', (req, res)=>{
  Todo.find({}).then((todos)=>{
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});


app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo)=>{
    if(todo){
      res.send(todo);
    }
    else {
      res.status(404).send();
    }
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(todo){
      res.status(200).send(todo);
    }else{
      res.status(404).send();
    }

  }).catch((e)=>{
    res.status(404).send();
  });

});

app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});


module.exports = {app};
