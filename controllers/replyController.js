const Reply = require('../models/replyModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');

exports.addCommentReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user;
    const user = await User.findById(userId);
    const fullname = user.fullname;

    const { reply } = req.body;
    const newReply = new Reply({
      userId,
      username: fullname,
      reply,
      likes: 0,
      dislikes: 0,
    });
    await newReply.save();
    await Comment.findOneAndUpdate(commentId, {
      $push: {
        replies: newReply,
      },
    });

    return res.status(201).json({
      status: 'Reply added successfully!',
      data: {
        review: newReply,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'Error creating reply',
      message: err,
    });
  }
};

exports.getCommentReplies = async (req, res) => {
  try {
    const reply = await Comment.findById(req.params.commentId).populate(
      'replies'
    );
    return res.status(200).json({
      status: 'Replies fetched successfully!',
      data: {
        replies: reply.replies,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'Error fetching replies',
      message: err,
    });
  }
};

exports.getReply = async (req, res) => {
    try {
      const reply = await Reply.findById(req.params.commentId);
      return res.status(200).json({
        status: 'Reply fetched successfully!',
        data: {
          reply,
        },
      });
    } catch (err) {
      return res.status(404).json({
        status: 'Error fetching reply',
        message: err,
      });
    }
};

exports.updateReply = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedReply = await Reply.findByIdAndUpdate(id, req.body);
  
      return res.status(201).json({
        status: 'Reply updated successfully!',
        data: {
          reply: updatedReply,
        },
      });
    } catch (err) {
      return res.status(404).json({
        status: 'Error updating comment',
        message: err,
      });
    }
};

exports.deleteCommentReply = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;

    await Reply.findByIdAndDelete(replyId);
    await Comment.findOneAndUpdate(commentId, {
      $pull: {
        reviews: commentId,
      },
    });

    return res.status(204).json({
      status: 'Reply deleted successfully',
      data: null,
    });
  } catch (err) {
    return res.status(404).json({
      status: 'Error deleting reply',
      message: err,
    });
  }
};
