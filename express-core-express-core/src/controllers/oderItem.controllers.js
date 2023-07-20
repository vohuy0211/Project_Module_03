const OderItems = require('../app/models/oderItem.model');
const Books = require('../app/models/book.model');
const Oder = require('../app/models/oder.model');
class oderItemController {
  async handleGetOderItem(req, res) {
    try {
      const OderAll = await OderItems.findAll({
        include: [
          {
            model: Books,
            attributes: ['price', 'nameBook', 'img'],
          },
        ],
        attributes: ['id', 'quantity', 'book_id'],
      });
      res.status(200).json({ data: OderAll });
    } catch (error) {
      res.status(500).json({ msg: 'Server loi' });
    }
  }

  async handlePostOderItem(req, res) {
    try {
      const { book_id, oders_id } = req.body;
      let { quantity } = req.body;

      // Tìm kiếm oderItem trong cơ sở dữ liệu dựa vào book_id và oders_id
      const existingOderItem = await OderItems.findOne({
        where: {
          book_id: book_id,
          oders_id: oders_id,
        },
      });

      if (existingOderItem) {
        // Nếu sản phẩm đã có trong oderItem, cộng thêm 1 vào quantity
        quantity += existingOderItem.quantity;

        // Cập nhật quantity trong cơ sở dữ liệu
        await existingOderItem.update({ quantity: quantity });

        res.status(200).json({ message: 'Cập nhật giỏ hàng thành công', data: existingOderItem });
      } else {
        // Nếu sản phẩm chưa có trong oderItem, tạo mới oderItem
        const result = await OderItems.create({ book_id, oders_id, quantity });
        res.status(200).json({ message: 'Thêm vào giỏ hàng thành công', data: result });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }

  async handleDeleteItem(req, res) {
    try {
      const { id } = req.params;
      const result = await OderItems.destroy({ where: { oders_id: id } });
      res.status(200).json({ message: 'Oder item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete oder item' });
    }
  }

  async handleDeleteById(req, res) {
    try {
      const { id } = req.params;
      const result = await OderItems.destroy({ where: { id: id } });
      res.status(200).json({ message: 'Oder item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete oder item' });
    }
  }

  async handlePatchOderItem(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      await OderItems.update({ quantity }, { where: { id: id } });
      res.status(200).json({ message: 'Oder item updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update oder item' });
    }
  }

  async handleGetOderItemById(req, res) {
    try {
      const id = req.params.id;
      console.log('id ====', req.params.id);
      const orderUser = await Oder.findOne({
        where: {
          user_id: id,
        },
      });
      console.log(orderUser);
      const data = await OderItems.findAll({
        where: {
          oders_id: orderUser.id,
        },
        include: [
          {
            model: Books,
            attributes: ['price', 'nameBook', 'img'],
          },
        ],
        attributes: ['id', 'quantity', 'book_id'],
      });

      if (data) {
        res.status(200).json({ data: data });
      } else {
        res.status(500).json({ message: 'Không tìm thấy OderItem với id đã cho', data: [] });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = new oderItemController();
