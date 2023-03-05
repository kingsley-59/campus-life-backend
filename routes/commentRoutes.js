const express = require('express');
const commentRoute = express.Router();
const { auth } = require('../middleware/auth');
const commentController = require('../controllers/commentController');
const replyController = require('../controllers/replyController');

commentRoute.get('/fetchComments/:lodgeId', commentController.getLodgeComments);
commentRoute.get('/fetch/:id/', auth, commentController.getComment);
commentRoute.put('/update/:id/', auth, commentController.updateComment);
commentRoute.post('/create/:lodgeId', auth, commentController.addUserComment);
commentRoute.delete(
  '/delete/:lodgeId/:commentId',
  auth,
  commentController.deleteUserComment
);

// Comment Replies
commentRoute.post('/reply/:commentId', auth, replyController.addCommentReply);
commentRoute.get('/reply/:replyId/', auth, replyController.getReply);
commentRoute.get('/replies/:commentId', replyController.getCommentReplies);
commentRoute.put('/reply/:replyId', auth, replyController.updateReply);
commentRoute.delete('/reply/:commentId/:replyId', auth, replyController.deleteCommentReply);

exports.commentRoute = commentRoute;