const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost/video";
const bodyParser = require('body-parser');
const urlcodeParser = bodyParser.urlencoded({ extended: false});
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0/\/", salt);
const cookieParser = require("cookie-parser")
module.exports = router; 

router.use(cookieParser("Super geheim"))

mongoose.connect('mongodb://localhost/video')
require(__dirname + '/../models/user-model')
const User = mongoose.model('users')

//render sign-up page
router.get('/sign-up', (req, res) => {
    res.clearCookie('loggedIn');
    res.render('layouts/user-signup', {pageTitle: "User signup"});
})

//render login page
router.get('/login', (req, res) => {
    res.render('layouts/user-login', {pageTitle: "User Login"});
})

//post method for signing up
router.post('/sign-up', urlcodeParser, (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("B4c0/\/", salt, function(err, hash) {
            MongoClient.connect(url, (err, db) => {
                if (err) throw err;
                    var video = db.db("video");
                    var newUser = {
                        name: req.body.name,
                        username: req.body.username,
                        password: hash
                    }
                    video.collection("users").insertOne(newUser, function(err, res) {
                if (err) throw err;
                    console.log("1 user inserted");
                    db.close();
                    });
                res.redirect('/user/login')
                });
        });
    })
})

//post method for loggin in
router.post('/login', urlcodeParser, (req, res) => {
    debugger
    User.findOne({username: req.body.username}, (err, result) => {
        if(!result){
            res.render('layouts/user-login', {incorrectCredentials: true})
            return;
        }
        bcrypt.compare(req.body.password, result.password, function(err, resu) {
            if (err) {
            res.end()
            } 
            res.cookie('loggedIn', 'true', { signed: true });
            res.redirect('/');
        })  
    });
});

