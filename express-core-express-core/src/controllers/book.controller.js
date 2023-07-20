const Books = require('../app/models/book.model');
const { Op } = require('sequelize');

class bookController {
  async handleGetBook(req, res) {
    try {
      const bookAll = await Books.findAll();
      res.status(200).json({ data: bookAll });
    } catch (error) {
      res.status(500).json({ msg: 'Server loi' });
    }
  }

  async handlePostBook(req, res) {
    try {
      const { img, nameBook, quantity, author, description, category, price } = req.body;
      console.log('dữ liệu nè ===>', req.body);
      const result = await Books.create({ img, nameBook, quantity, author, description, category, price });
      res.status(200).json({ message: 'Inserted successfully', result });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async handleGetBookId(req, res) {
    try {
      const bookId = req.params.id;
      console.log(bookId);
      const dataBookId = await Books.findByPk(bookId);
      res.status(200).json({ data: dataBookId });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async handleDelete(req, res) {
    try {
      const bookId = req.params.id;
      const bookDelete = await Books.findByPk(bookId);
      if (!bookDelete) {
        return res.status(404).json({ message: 'Book not found' });
      }
      // Delete the book from the database
      await bookDelete.destroy();

      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  async handleSearch(req, res) {
    const searchTerm = req.params.searchTerm;
    console.log(req.params.searchTerm);
    try {
      const bookAll = await Books.findAll({
        where: {
          nameBook: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      });
      res.status(200).json({ data: bookAll });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server loi' });
    }
  }
  async handlePatchBook(req, res) {
    try {
      const bookId = req.params.id;
      const { img, price, nameBook, quantity, author, description, category } = req.body;
      const updateBook = await Books.update(
        { img, price, nameBook, quantity, author, description, category },
        { where: { id: bookId } }
      );
      res.status(200).json({ message: 'Updated successfully', data: updateBook });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = new bookController();
