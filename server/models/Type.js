const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    uses: {
        type: Number,
        default: 0
    }
});


const Type = mongoose.model('Type', typeSchema);

module.exports = Type;