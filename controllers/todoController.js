
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
var itemOne = Todo({item: 'get flowers'}).save(function(err) {

    if(err) throw err;
    console.log('item saved');
});

var data = [{item: 'get water'}, {item: 'walk'}, {item: "play soccer"}];

var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports =function(app) {


    app.get('/todo', function(req, res){
        
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res) {

        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo) {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });

};