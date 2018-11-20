var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    username: String,
    password: String
})

mongoose.model('users', UserSchema);