const mongoose = require('mongoose');

const chatboxSchema = new mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Chatbox = mongoose.model('chatbox', chatboxSchema);

module.exports = Chatbox;