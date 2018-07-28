var express = require('express');
var todoController = require('./controllers/todocontroller');

var app = express();

//setup templte engine
app.set('view engine', 'ejs');

//Static files
app.use(express.static('./public'));

//Fire controllers
todoController(app);

//Listen to a port
app.listen(3000);
console.log('You are listening to port 3000');