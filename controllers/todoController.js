
var bodyParser =require('body-parser');
var mongoose = require('mongoose');


//connecting to data base

mongoose.connect('mongodb://root:root@ds125368.mlab.com:25368/todos');

//create a schema
var todoSchema = new mongoose.Schema({

    item: String
});
//model
var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'get flowers'}).save(function(err) {

//     if(err) throw err;
//     console.log('item saved');
// });

// var data = [{item: 'get water'}, {item: 'walk'}, {item: "play soccer"}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports =function(app) {


    app.get('/todo', function(req, res){
        //get data from database and render in view
        Todo.find({}, function(err, data){
            if(err) throw err;

            res.render('todo', {todos: data});
        });
        
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        //get data from the view and save in database
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
        
       
    });

    app.delete('/todo/:item', function(req, res) {
        //delete item form database

        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
            if(err) throw err;
            res.json(data);
        });
    //     data = data.filter(function(todo) {
    //         return todo.item.replace(/ /g, '-') !== req.params.item;
    //     });
    //     res.json(data);
    });

};