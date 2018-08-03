const mongoose = require('mongoose');

const bcrypt = require('bcrypt-nodejs');

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
    profilePicture: {
        type: String,
        default: ''
    }
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


userSchema.methods.comparePassword = (candidatePassword, hashedPassword, cb) => {

    bcrypt.compare(candidatePassword, hashedPassword, (err, res) => {
        if (err) return cb(err);
        console.log(res);
        cb(null, res);
    });
};

userSchema.pre('save', function(next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // hash the password using our new salt
    bcrypt.hash(user.password, null, null, function(err, hash) {

        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;

        next();
    });

});

const User = mongoose.model('User', userSchema);

module.exports = User;