const Oder = require('../app/models/oder.model');

class OderController {
  async postOder(req, res) {
    try {
      const { status, user_id } = req.body;
      console.log('oder :', req.body);
      const checkId = await Oder.findOne({ where: { user_id: user_id } });
      if (!checkId) {
        const result = await Oder.create({ status, user_id });
        res.status(200).json({ message: 'Inserted successfully', result });
      }
      console.log('checkId : ', checkId);
      res.status(200).json({ message: 'Updated successfully', checkId });
    } catch (error) {
      res.status(500).json({ message: 'không nhận được' });
    }
  }

  async getAllOder(req, res) {
    try {
      const dataOder = await Oder.findAll();
      res.status(200).json({ oder: dataOder });
    } catch (error) {}
  }

  async getOderById(req, res) {
    try {
      const id = req.params.id;
      const dataOder = await Oder.findAll({ where: { user_id: id } });
      res.status(200).json({ oder: dataOder });
    } catch (error) {}
  }
}

module.exports = new OderController();
