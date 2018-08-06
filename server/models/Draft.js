const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'Untitled'
    },
});


const Draft = mongoose.model('Draft', draftSchema);

module.exports = Draft;