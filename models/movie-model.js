var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: String,
    year: String,
    director: String,
    duration: String,
    genre: Array,
    rate: String
})

mongoose.model('movies', MovieSchema);
