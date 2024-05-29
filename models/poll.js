const mongoose = require('mongoose');

const createSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100 // Example: Limiting the title to 100 characters
    },
    options: {
        type: [{
            text: {
                type: String,
                required: true
            },
            votes: {
                type: Number,
                default: 0
            }
        }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 10'] // Example: Limiting the number of options to 10
    }
});

function arrayLimit(val) {
    return val.length <= 10;
}

module.exports = mongoose.model('Poll', createSchema);