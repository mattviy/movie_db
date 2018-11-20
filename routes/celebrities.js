const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost/video";

router.use(cookieParser())
var urlcodeParser = bodyParser.urlencoded({ extended: false});

mongoose.connect('mongodb://localhost/video')

require(__dirname + '/../models/celebrities-model');
const Celebrities = mongoose.model('celebrities');

//router.get celebrities
router.get('/', (req, res) => {
    var Cookies = req.cookies;
    if (Cookies.loggedIn === undefined) res.redirect('/user/login');
    else 
    Celebrities.find({}, (err, result ) => {
        if(err) {
            console.log("ERROR:", err)
            res.end()
        } else {
            res.render('layouts/celebrities', {celebrities: result, loggedIn: true})
        }
    })
});

// app.get create/add celebrities page 
router.get('/add-celebrities', (req, res) => {
    var Cookies = req.cookies;
    if (Cookies.loggedIn === undefined) res.redirect('/user/login', {loggedIn: false});
    else 
    res.render('layouts/add-celebrities', {pageTitle: "Add celebrities", loggedIn: true});
});

// app.post create  
router.post('/add-celebrities', urlcodeParser, (req, res) => {
    var Cookies = req.cookies;
    if (Cookies.loggedIn === undefined) res.redirect('/user/login', {loggedIn: false});
    else 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
            var video = db.db("video");
            var newCelebrity = req.body;
            video.collection("celebrities").insertOne(newCelebrity, function(err, res) {
        if (err) throw err;
            console.log("1 celebrity inserted");
            db.close();
            });
        res.redirect('/celebrities', {loggedIn: true})
      });
})

module.exports = router; 