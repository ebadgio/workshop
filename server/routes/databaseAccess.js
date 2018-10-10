const mongoose = require('mongoose');
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

router.get('/fetch/draft/:draftId', (req, res) => {
    Draft.findById(req.params.draftId)
        .populate('author')
        .then((draft) => {
            if (draft) {
                return res.json({success: true, draft: draft});
            } else {
                return res.json({success: false});
            }
        })
        .catch((err) => {
           return res.json({success: false, error: err});
        });
});

router.get('/fetch/drafts/:userId', (req,res) => {

    // console.log('hit fetch user drafts');

    if (req.params.userId !== req.user._id.toString()) {
        return res.redirect('/');
    }

    // Find 10 most recently updated drafts
    Draft.find({"author": req.params.userId})
        .limit(10)
        .skip(req.query.pageNum * 10)
        .sort({"updatedAt": -1})
        .populate('author')

        .then((drafts) => {
            return res.json({success: true, drafts: drafts});
        })

        .catch((err) => {
            console.log('fetch user drafts error', err);
            return res.json({success: false, error: err});
        });


});

router.get('/fetch/works/:userId', (req,res) => {

    // TODO: paginate drafts and works with query parameters

    // console.log('hit fetch user drafts');

    if (req.params.userId !== req.user._id.toString()) {
        return res.redirect('/');
    }

    // Find 10 most recently updated drafts
    Work.find({"author": req.params.userId})
        .limit(10)
        .skip(req.query.pageNum * 10)
        .sort({"updatedAt": -1})
        .populate('author')
        .populate('type')
        .populate('topics')

        .then((works) => {
            return res.json({success: true, works: works});
        })

        .catch((err) => {
            console.log('fetch user works error', err);
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

router.get('/fetch/topics/all', (req, res) => {
    Topic.find()
        .then((topics) => {
            return res.json({success: true, topics: topics})
        })

        .catch((err) => {
            return res.json({success: false, err: err})
        })
});

router.post('/create/work', (req, res) => {

    // User must be in an active session to save a work
    if (!req.user) {
        res.redirect('/');
        return;
    }

    // Request sender must be same user as user in session
    if (!req.user._id.equals(mongoose.Types.ObjectId(req.body.author))) {
        res.redirect('/');
        return;
    }

    // Need to store the work after it's saved in order to send back to client
    let workSend;

    const newWork = new Work({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        topics: req.body.topics,
        description: req.body.description
    });

    // Create the new work
    newWork.save()

        .then((savedWork) => {
            workSend = savedWork;
            return Type.findById(req.body.type)
        })

        // Update this number of uses for this work's selected type
        .then((type) => {
            type.uses += 1;
            return type.save();
        })

        // Find all the topics
        .then((saved) => {
            return Promise.all(
                req.body.topics.map((topic) => Topic.findById(topic))
            )
        })

        // For each topic, increment its number of uses and save
        .then((topics) => {
            return Promise.all(
                topics.map((topic) => {
                    topic.uses += 1;
                    return topic.save();
                })
            )
        })

        // Delete this draft document
        .then((savedTopics) => {
            return Draft.remove({"_id": req.body.draftId});
        })

        // Send created work back to client
        .then((removed) => {
            return res.json({success: true, work: workSend});
        })

        .catch((err) => {
            console.log('error in work create', err);
            return res.json({success: false, error: err});
        })

});

module.exports = router;