const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    question: String,
    options: [{ option: String, votes: { type: Number, default: 0 } }]
});

module.exports = mongoose.models.Poll || mongoose.model('Poll', pollSchema);