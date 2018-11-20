const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost/video";


router.use(cookieParser())
var urlcodeParser = bodyParser.urlencoded({ extended: false});


mongoose.connect('mongodb://localhost/video')


require(__dirname + '/../models/movie-model')
const Movie = mongoose.model('movies')


// app.get movies
router.get('/', (req, res) => {
    var Cookies = req.cookies;
    if (Cookies.loggedIn === undefined) res.redirect('/user/login');
    else 
    Movie.find({}, (err, result ) => {
        if(err) {
            console.log("ERROR:", err)
            res.end()
        } else {
            res.render('layouts/movies', {movies: result, loggedIn: true})
        }
    })
});


//app.get create/add movies
router.get('/create-movies', (req, res) => {
    var Cookies = req.cookies;
    if (Cookies.loggedIn === undefined) res.redirect('/user/login', {loggedIn: false});
    else 
    res.render('layouts/create-movies', {pageTitle: "createMovies",  loggedIn: true});
});

// app.post 
router.post("/create-movies", urlcodeParser, (req, res) => {
    var Cookies = req.cookies;
    if (Cookies.loggedIn === undefined) res.redirect('/user/login', {loggedIn: false});
    else 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
            var video = db.db("video");
            var newVideo = req.body;
            video.collection("movies").insertOne(newVideo, function(err, res) {
        if (err) throw err;
            console.log("1 video inserted");
            db.close();
            });
        res.redirect('/movies');
      });
});

//render search page
router.get('/search', (req, res) => {
    var Cookies = req.cookies;
    if (Cookies.loggedIn === undefined) res.redirect('/user/login', {loggedIn: false});
    else 
    res.render('layouts/search', {pageTitle: "SearchMovies", loggedIn: true});
});

//render search-result page
router.get('/search-result', (req, res) => {
    var Cookies = req.cookies;
    if (Cookies.loggedIn === undefined) res.redirect('/user/login', {loggedIn: false});
    else 
    res.render('layouts/search-result', {pageTitle: "SearchResult", loggedIn: true});
});

//app.post search movies
router.post('/search-result', urlcodeParser, (req, res) => {
    Movie.find({title: req.body.title}, function(err, result) {
        res.render("layouts/search-result", {movies: result, loggedIn: true})  
    })   
})

module.exports = router;
