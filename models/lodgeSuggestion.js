const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    lodge: { type: mongoose.Types.ObjectId, ref: 'lodge' },
    feature: { type: String },
    newValue: { type: String },
    suggestedBy: { type: mongoose.Types.ObjectId, ref: 'user' },
    isMerged: { type: Boolean, default: false },
    flag: {
        type: String,
        enum: [
            'active', // yet to be seen and flagged by admins
            'merged', // merged by admins
            'duplicate', // suggestion is same from another user and has been merged
            'invalid', // doesn't seen right, like using an image for lodge name
            'stale' // outdated or inactive
        ],
        default: 'active'
    }
}, { timestamps: true });

const LodgeSuggestion = mongoose.model('LodgeSuggestion', suggestionSchema);

module.exports = LodgeSuggestion;