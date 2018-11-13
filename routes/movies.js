const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/video')
var Schema = mongoose.Schema;

var Movie = mongoose.model('movies', new Schema({ 
    title: String,
    year: String,
    director: String,
    duration: String,
    genre: Array,
    rate: String
}), 'movies')

router.get('/', (req, res) => {
    Movie.find({}, function(err, result ) {
        if(err) {
            console.log("ERROR!!", err)
            res.end()
        } else {
            res.render('layouts/movies', {movies: result})
        }
    })
})

module.exports = router;

 