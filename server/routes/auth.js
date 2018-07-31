const express = require('express');
const router = express.Router();
const User = require('../models/User');

module.exports = (passport) => {

    router.post('/register', (req, res) => {
        const u = new User({
            username: req.body.username,
            password: req.body.password,
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email
        });
        u.save((err, user) => {
            if (err) {
                console.log(err);
                res.status(500).redirect('/register');
                return;
            }
            console.log('User registered!', user);
            res.json({success: true, user: user});
        });
    });

    // POST Login page
    router.post('/login',
                passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
        if (req.user) {
            res.json({success: true, user: req.user});
        } else {
            res.json({success: false});
        }
    });

    return router;
};