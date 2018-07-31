const mongoose = require('mongoose');

const crypto = require("crypto-js");

const hashKey = process.env.HASH_KEY;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    verified: {
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
    bio: {
        type: String,
        default: ''
    },
    followingNum: {
        type: Number,
        default: 0
    },
    followersNum: {
        type: Number,
        default: 0
    }
});

userSchema.methods.encryptPassword = (password) => {
    encrypted = crypto.AES.encrypt(password, hashKey).toString();
    console.log(encrypted);
    return encrypted;
};

userSchema.methods.decryptPassword = (hasedPassword) => {
    return crypto.AES.decrypt(hashedPassword, hashKey).toString();
};

userSchema.pre('save', function(next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // Hash new password
    hashed = user.encryptPassword(user.password);

    // Set hased password
    user.password = hashed;

    // Continue
    next();

});

const User = mongoose.model('User', userSchema);

module.exports = User;