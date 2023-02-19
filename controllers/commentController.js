const Comment = require('../models/commentModel');
const User = require('../models/userModel');
const Lodge = require('../models/lodgeModel');

exports.addUserComment = async (req, res) => {
  try {
    const { lodgeId } = req.params;
    const userId = req.user;
    const user = await User.findById(userId);
    const fullname = user.fullname;

    const { comment } = req.body;
    const newComment = new Comment({
      userId,
      username: fullname,
      comment,
      likes: 0,
      dislikes: 0,
    });
    await newComment.save();
    await Lodge.findOneAndUpdate(lodgeId, {
      $push: {
        reviews: newComment,
      },
    });

    return res.status(201).json({
      status: 'Comment added successfully!',
      data: {
        review: newComment,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'Error creating comment',
      message: err,
    });
  }
};

exports.getLodgeComments = async (req, res) => {
  try {
    const review = await Lodge.findById(req.params.lodgeId).populate(
      'reviews'
    );
    return res.status(200).json({
      status: 'Comments fetched successfully!',
      data: {
        comments: review.reviews,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'Error fetching comments',
      message: err,
    });
  }
};

exports.getComment = async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      return res.status(200).json({
        status: 'Comment fetched successfully!',
        data: {
          comment,
        },
      });
    } catch (err) {
      return res.status(404).json({
        status: 'Error fetching comment',
        message: err,
      });
    }
};

exports.updateComment = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedComment = await Comment.findByIdAndUpdate(id, req.body);
  
      return res.status(201).json({
        status: 'Comment updated successfully!',
        data: {
          history: updatedComment,
        },
      });
    } catch (err) {
      return res.status(404).json({
        status: 'Error updating comment',
        message: err,
      });
    }
};

exports.deleteUserComment = async (req, res) => {
  try {
    const { commentId, lodgeId } = req.params;

    await Comment.findByIdAndDelete(commentId);
    await Lodge.findOneAndUpdate(lodgeId, {
      $pull: {
        reviews: commentId,
      },
    });

    return res.status(204).json({
      status: 'Comment deleted successfully',
      data: null,
    });
  } catch (err) {
    return res.status(404).json({
      status: 'Error deleting comment',
      message: err,
    });
  }
};
