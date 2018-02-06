var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//template engine

app.set('view engine', 'ejs');

//stat file

app.use('/assets', expess.static('./public'));



app.listen(3000);
console.log("Server listening on port 3000");