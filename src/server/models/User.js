const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    googleId: String,
    email: String
})

mongoose.model('User', userSchema);