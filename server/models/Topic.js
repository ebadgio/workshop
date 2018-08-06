const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    similarTopics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic'
        }
    ],
    uses: {
        type: Number,
        default: 0
    }
});


const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;