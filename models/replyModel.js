const mongoose = require('mongoose');

let replySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: { type: String },
    reply: { type: String },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reply', replySchema);
