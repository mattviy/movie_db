var express = require('express');
var app = express();
var path = require("path");
var exphbs = require("express-handlebars");
var hbs = require("hbs");


var index = require('./routes/index');
var movies = require('./routes/movies');
var user = require('./routes/user');
var celebrities = require('./routes/celebrities');

app.use(express.static(__dirname + '/public'));

//change default view engine to bhs instead of .html
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

//middleware that connects the routes
app.use('/', index);
app.use('/movies', movies);
app.use('/user', user);
app.use('/celebrities', celebrities);


app.listen(3000, function(){
    console.log("listening");
});
