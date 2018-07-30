const mongoose = require('mongoose');

const SHA256 = require("crypto-js/sha256");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    emailVarified: {
        type: Boolean,
        default: false
    },
    fname: {
        type: String,
        default: ''
    },
    lname: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },

});

const User = mongoose.model('User', userSchema);

module.exports = User;