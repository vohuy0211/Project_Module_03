const CommentUser = require('../app/models/comment.model');

class CommentController {
  async postComment(req, res) {
    // console.log('data là ===> ', req.body);
    try {
      const { comment, userId } = req.body;
      const result = await CommentUser.create({ comment: comment, user_id: userId });
      console.log('result là ===> ', result);
      res.status(200).json({ message: 'Inserted successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Không comment được' });
    }
  }
  async getComment(req, res) {
    try {
      const dataComment = await CommentUser.findAll();
      res.status(200).json({ comment: dataComment });
    } catch (error) {
      res.status(500).json({ message: 'Không lấy được dữ liệu comment' });
    }
  }
}

module.exports = new CommentController();
