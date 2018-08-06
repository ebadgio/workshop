const express = require('express');
const router = express.Router();
const User = require('../models/User');

module.exports = (passport) => {

    router.post('/register', (req, res) => {
        fname = req.body.fname
        lname = req.body.lname
        fname[0] = fname[0].toUpperCase();
        lname[0] = lname[0].toUpperCase();

        const u = new User({
            username: req.body.username,
            password: req.body.password,
            fname: fname,
            lname: lname,
            fullname: fname + ' ' + lname,
            email: req.body.email
        });
        u.save((err, user) => {
            if (err) {
                console.log(err);
                res.status(500).redirect('/register');
                return;
            }
            // req / res held in closure
            req.logIn(user, function(err) {
                if (err) { return res.json({success: false, error: err}) }
                return res.json({success: true, user: req.user});
            });

            
        });
    });

    // POST Login page
    router.post('/login', passport.authenticate('local'), function(req, res) {
        console.log('hit login');
        if (req.user) {
            res.json({success: true, user: req.user});
        } else {
            res.json({success: false});
        }
    });

    router.get('/logout', function(req, res){
        req.logout(); // Passport logout function
        return res.json({success: true});
    });


    // router.post('/login', (req, res, next) => {

    //     passport.authenticate('local', function(err, user, info) {
    //         if (err) return res.json({success: false, error: err});
    //         if (!req.user) return res.json({success: false});

    //         return res.json({success: true, user: req.user});

    //     })(req, res, next);

    // });

    return router;
};