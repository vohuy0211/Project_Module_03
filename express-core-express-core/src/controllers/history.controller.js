const History = require('../app/models/history.model');
const { Op } = require('sequelize');
const Oder = require('../app/models/oder.model'); // Import model "user"
const Book = require('../app/models/book.model');
const User = require('../app/models/user.model');

class historyController {
  async handleGetHistory(req, res) {
    try {
    } catch (error) {}
  }

  async handlePostHistory(req, res) {
    try {
      const { totalPrice, oderDate, oders_id, books_id, quantity, status } = req.body;
      console.log(req.body);
      const result = await History.create({ totalPrice, oderDate, oders_id, books_id, quantity, status });
      // const book = await Book.findByPk(books_id);
      // if (book) {
      //   const updateQuantity = book.quantity - quantity;
      //   await Book.update({ quantity: updateQuantity });
      // }
      res.status(200).json({ data: result });
    } catch (error) {
      console.log(error);
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
  async handleGetHistoryById(req, res) {
    try {
      const id = req.params.id;
      console.log('user id ', id);
      const finOrder = await Oder.findOne({ id: id });
      const orderId = finOrder.dataValues.id;
      const historyUser = await History.findAll({
        where: { oders_id: orderId },
        include: [
          {
            model: Oder,
            attributes: ['id', 'user_id'],
            include: [{ model: User, attributes: ['username', 'address', 'phoneNumber'] }],
          },
          { model: Book, attributes: ['id', 'nameBook', 'price', 'img'] },
        ],
      });
      if (!historyUser) {
        return res.status(404).json({ message: 'Không tìm thấy lịch sử đơn hàng với id đã cho', data: [] });
      }
      res.status(200).json({ data: historyUser });
    } catch (error) {
      res.status(500).json({ message: 'Không tìm thấy  với id đã cho', data: [] });
    }
  }
  async handleGetHistoryAll(req, res) {
    try {
      const historyData = await History.findAll({
        include: [
          {
            model: Oder,
            attributes: ['id', 'user_id'],
            include: [
              {
                model: User,
                attributes: ['username', 'address', 'phoneNumber'],
              },
            ],
          },
          {
            model: Book,
            attributes: ['id', 'nameBook', 'price', 'img'],
          },
        ],
      });

      if (!historyData || historyData.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy lịch sử đơn hàng', data: [] });
      }

      res.status(200).json({ data: historyData });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi truy vấn dữ liệu lịch sử', data: [] });
    }
  }
}

module.exports = new historyController();
