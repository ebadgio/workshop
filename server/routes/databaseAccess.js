const express = require('express');
const router = express.Router();

// Models
const User = require('../models/User');
const Draft = require('../models/Draft');
const Work = require('../models/Work');

// Utils
const Utils = require('../utils')
const generateError = Utils.generateError;

router.get('/fetch/user', (req, res) => {
    if (req.user) {
        return res.json({success: true, user: req.user});
    }
     
    return res.json({success: false});
});

router.post('/save/draft', (req, res) => {

    console.log('hit save draft', req.body);

    // If no user in session send back to home page
    if (!req.user) return res.redirect('/')

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
        })
        
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

router.get('/user/works/:userId', (req,res) => {

    console.log('hit user works');

    if (req.params.userId !== req.body.user._id.toString()) {
        return res.redirect('/');
    }

    let sendDrafts;

    // Find 10 most recently updated drafts
    Draft.find({"author": user._id})
        .limit(10)
        .sort({"updatedAt": -1})
        .populate('author')

        .then((drafts) => {

            // Store drafts for next step
            sendDrafts = drafts;

            // Find 10 most recently created works
            return Work.find({"author": sendUser._id})
                        .limit(10)
                        .sort({"createdAt": -1})
                        .populate('author')
        })

        .then((works) => {
            return res.json({success: true, works: works, drafts: sendDrafts});
        })

        .catch((err) => {
            console.log('fetch user works error', err);
            return res.json({success: false, error: err});
        });


});

router.get('/fetch/profile/items/:username', (req, res) => {

    console.log('hit fetch items', req.body, req.query);

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

module.exports = router;