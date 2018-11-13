var express = require('express');
var app = express();
var path = require("path");
var exphbs = require("express-handlebars");
var hbs = require("hbs");


var index = require('./routes/index');
var movies = require('./routes/movies');

app.use(express.static('public'));

//change default view engine to bhs instead of .html
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

//middleware that connects the routes
app.use('/', index);
app.use('/movies', movies);


app.listen(3000, function(){
    console.log("listening");
});
