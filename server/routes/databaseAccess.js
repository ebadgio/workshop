const express = require('express');
const router = express.Router();

// Models
const User = require('../models/User');
const Draft = require('../models/Draft');
const Work = require('../models/Work');
const Type = require('../models/Type');
const Topic = require('../models/Topic');

// Utils
const Utils = require('../utils');
const generateError = Utils.generateError;

router.get('/fetch/user', (req, res) => {
    if (req.user) {
        return res.json({success: true, user: req.user});
    }
     
    return res.json({success: true, user: {}});
});

router.post('/save/draft', (req, res) => {

    // console.log('hit save draft', req.body);

    // If no user in session send back to home page
    if (!req.user) return res.redirect('/');

    if (req.body.draftId) {

        // If there is a draft id, find that draft and modify it
        Draft.findById(req.body.draftId)
            .populate('author')
            .then((draft) => {

                // Make sure draft is returned
                if (!draft._id) {
                    generateError('That draft does not exist')
                }

                // Make sure the current editor is the author of this draft
                if (draft.author._id.toString() !== req.body.author) {
                    generateError('Editor does not have permission to edit this draft')
                }

                // Update draft
                draft.title = req.body.title;
                draft.content = req.body.content;

                // Save draft and return promise
                return draft.save()
                
            })
            
            .then((savedDraft) => {

                // Saved successfully 
                return res.json({success: true, draftId: savedDraft._id});
            })
            
            .catch((err) => {
                console.log('draft save err', err);
                return res.json({success: false, error: err, raftId: req.body.draftId});
            });

    } else {

        // No draft id sent, so create new draft 
        const draft = new Draft({
            author: req.body.author._id,
            authorUsername: req.body.author.username,
            content: req.body.content,
            title: req.body.title
        });
        
        // Save draft and return promise
        return draft.save()

            .then((newDraft) => {

                // Saved successfully, send back new draft id
                return res.json({success: true, draftId: newDraft._id})
            })

            .catch((err) => {
                console.log('draft save err', err);
                return res.json({success: false, error: err});
            });
    }
});

router.get('/fetch/works/:userId', (req,res) => {

    // TODO: paginate drafts and works with query parameters

    // console.log('hit fetch user drafts');

    if (req.params.userId !== req.user._id.toString()) {
        return res.redirect('/');
    }

    let sendDrafts;

    // Find 10 most recently updated drafts
    Draft.find({"author": req.params.userId})
        .limit(10)
        .sort({"updatedAt": -1})
        .populate('author')

        .then((drafts) => {
            sendDrafts = drafts;
            return Work.find({"author": req.params._id})
                .limit(10)
                .sort({"createdAt": -1})
                .populate('author')
        })

        .then((works) => {
            return res.json({success: true, drafts: sendDrafts, works: works});
        })

        .catch((err) => {
            console.log('fetch user drafts error', err);
            return res.json({success: false, error: err});
        });


});

router.get('/fetch/profile/items/:username', (req, res) => {

    // console.log('hit fetch items', req.body, req.query);

    let sendUser;
    let sendDrafts;

    User.findOne({"username": req.params.username})

        .then((user) => {
            
            if (!user) {

                // TODO: customize error pages
                return res.send('404: that user does not exist in our database')
            }

            // Store user for next steps
            sendUser = user;

            // Find 10 most recently created works
            return Work.find({"author": sendUser._id})
                        .limit(10)
                        .sort({"createdAt": -1})
                        .populate('author')
        })

        .then((works) => {
            return res.json({success: true, user: sendUser, works: works});
        })

        .catch((err) => {
            console.log('fetch profile items error', err);
            return res.json({success: false, error: err});
        });


});

router.get('/fetch/types', (req, res) => {
    Type.find()
        .then((types) => {
            return res.json({success: true, types: types})
        })

        .catch((err) => {
            return res.json({success: false, err: err})
        })
});

router.post('/create/work', (req, res) => {

    // User must be in an active session to save a work
    if (!req.user) return res.redirect('/');

    // Request sender must be same user as user in session
    if (req.user._id !== req.body.author) return res.redirect('/');

    const newWork = new Work({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        topics: req.body.topics,
        description: req.body.description
    });

    newWork.save()

        .then((savedWork) => {
            return res.json({success: true, work: savedWork});
        })

        .catch((err) => {
            console.log('error in work create', err);
            return res.json({success: false, error: err});
        })

});

module.exports = router;