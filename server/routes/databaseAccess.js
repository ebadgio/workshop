const express = require('express');
const router = express.Router();

// Models
const User = require('../models/User');
const Draft = require('../models/Draft');

router.get('/fetch/user', (req, res) => {
    if (req.user) {
        res.json({success: true, user: req.user});
    } else {
        res.json({success: false});
    }
});

router.post('/save/draft', (req, res) => {

    console.log('hit save draft', req.body);

    if (!req.user) return res.redirect('/')

    if (req.body.draftId) {
        Draft.findById(req.body.draftId)
            .populate('author')
            .then((draft) => {

                if (!draft._id) {
                    // TODO: handle missing draft
                    let err = new Error();
                    err.name = 'That draft doesnt exist';
                    return err;
                }

                if (draft.author._id.toString() !== req.body.author) {
                    // TODO: handle incorrect author
                    let err = new Error();
                    err.name = 'Editor doesnt have permission to edit this draft';
                    return err;
                }

                draft.title = req.body.title;
                draft.content = req.body.content;

                return draft.save()
                
            })
            
            .then((savedDraft) => {
                return res.json({success: true, draftId: savedDraft._id});
            })
            
            .catch((err) => {
                console.log('draft save err', err);
                return res.json({success: false, error: err, raftId: req.body.draftId});
            });
    } else {
        const draft = new Draft({
            author: req.body.author,
            content: req.body.content,
            title: req.body.title
        })

        return draft.save()

        .then((newDraft) => {
            return res.json({success: true, draftId: newDraft._id})
        })

        .catch((err) => {
            console.log('draft save err', err);
            return res.json({success: false, error: err});
        });
    }
});

module.exports = router;