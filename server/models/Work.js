const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Type'
    },
    topics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic'
        }
    ],
    claps: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});


const Work = mongoose.model('Work', workSchema);

module.exports = Work;