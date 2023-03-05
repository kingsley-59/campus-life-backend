const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: { type: String },
    comment: { type: String },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    replies: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Reply",
        },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
