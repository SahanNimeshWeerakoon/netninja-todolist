var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test123@ds259001.mlab.com:59001/todo');

//Create a schema. This is like a blueprint to our data
var todoSchema = new mongoose.Schema({
	item: String
});

//Create a model
var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
	app.get('/todo', function(req,res){
		//Get data from mongodb and pass it to the view
		Todo.find({}, function(err, data){
			if(err) throw err;
			res.render('todo', {todos: data});
		});
	});

	app.post('/todo', urlencodedParser, function(req,res){
		//get data from view and add it to mongo db
		var newTodo = Todo(req.body).save(function(err,data){
			if(err) throw err;
			res.json(data);
		});
	});

	app.delete('/todo/:item', function(req,res){
		//Delete the item from mongo db
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if(err) throw err;
			res.json(data);
		});
	});
};