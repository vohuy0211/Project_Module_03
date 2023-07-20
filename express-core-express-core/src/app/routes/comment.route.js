const express = require('express');
const router = express.Router();
const CommentController = require('../../controllers/comment.Controllers');

router.post('/', CommentController.postComment);

router.get('/getComment', CommentController.getComment);

module.exports = router;
