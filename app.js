const express = require('express');
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = require("hbs");

const index = require('./routes/index');
const movies = require('./routes/movies');
const user = require('./routes/user');
const celebrities = require('./routes/celebrities');
const cookieParser = require("cookie-parser")

app.use(cookieParser("89Y%JMuipjZjVjG2XNLvm")); 

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
