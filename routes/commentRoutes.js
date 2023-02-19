const express = require('express');
const commentRoute = express.Router();
const commentController = require('../controllers/commentController');
const replyController = require('../controllers/replyController');

commentRoute.get('/fetchComments/:lodgeId', commentController.getLodgeComments);
commentRoute.get('/fetch/:id/', commentController.getComment);
commentRoute.put('/update/:id/', commentController.updateComment);
commentRoute.post('/create/:lodgeId', commentController.addUserComment);
commentRoute.delete(
  '/delete/:lodgeId/:commentId',
  commentController.deleteUserComment
);

// Comment Replies
commentRoute.post('/reply/:commentId', replyController.addCommentReply);
commentRoute.get('/reply/:replyId/', replyController.getReply);
commentRoute.get('/replies/:commentId', replyController.getCommentReplies);
commentRoute.put('/reply/:replyId', replyController.updateReply);
commentRoute.delete('/reply/:commentId/:replyId', replyController.deleteCommentReply);

exports.commentRoute = commentRoute;