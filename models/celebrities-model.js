
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CelebSchema = new Schema({
    firstname: String,
    lastname: String,
    nationality: String
})

mongoose.model('celebrities', CelebSchema);
