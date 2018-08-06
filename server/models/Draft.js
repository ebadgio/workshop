const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


const Draft = mongoose.model('Draft', draftSchema);

module.exports = Draft;