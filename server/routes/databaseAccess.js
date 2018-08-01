const express = require('express');
const router = express.Router();

// Models
const User = require('../models/User');

router.get('/fetch/user', (req, res) => {
    if (req.user) {
        res.json({success: true, user: req.user});
    } else {
        res.json({success: false});
    }
});

module.exports = router;