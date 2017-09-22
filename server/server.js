require('./config/config.js');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var _ = require('lodash');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var port = process.env.PORT;
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
    res.send({
      todos: todos
    });
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
      res.send({
        todo: todo
      });
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
      res.status(200).send({
        todo: todo
      });
    }else{
      res.status(404).send();
    }

  }).catch((e)=>{
    res.status(404).send();
  });

});

app.patch('/todos/:id', (req, res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completedAt = null;
    body.completed = false;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});


module.exports = {app};
