const jwt = require('jsonwebtoken');
const sceretKey = require('../configs/jwt.config');
var bcrypt = require('bcryptjs');
const User = require('../app/models/user.model');
const { Op } = require('sequelize');

class UserController {
  async handleRegister(req, res) {
    // get email vs password ở body
    const { email, password } = req.body;
    console.log(email, password);
    try {
      //kiểm tra username đã tồn tại chưa
      const UserData = await User.findOne({ where: { email } });

      // nếu mà tồn tại username thì báo lỗi
      if (UserData) {
        return res.status(400).json({ msg: 'email already exists' });
      }
      // trường hợp k tồn tại username
      const saltRounds = 10; //độ an toàn mã hóa của password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt); // Mã hóa password
      const user = await User.create({ ...req.body, password: hashedPassword }); // Insert dữ liệu, password = password mới mã hóa

      res.status(200).json({ msg: 'Register Successfully' });
    } catch (error) {
      // lỗi serve
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async handleLogin(req, res) {
    // get username vs password ở body
    const { email, password } = req.body;
    try {
      // Kiểm tra username và trả về toàn bộ data
      const user = await User.findOne({ where: { email } });
      // Nếu có user thì so sánh password bằng hàm compare
      if (user) {
        const myPass = await bcrypt.compare(password, user.password);
        if (myPass) {
          const accessToken = jwt.sign(user.dataValues, sceretKey);
          res.status(200).json({
            data: user,
            accessToken,
          });
        } else {
          res.status(401).json({ msg: 'Password Wrong' });
        }
      } else {
        // Nếu sai thì báo lỗi
        res.status(401).json({ msg: 'email dont exist' });
      }
    } catch (error) {
      res.status(404).json({ msg: 'not found' });
    }
  }

  async handleGetUser(req, res) {
    try {
      const userAll = await User.findAll();
      res.status(200).json({ data: userAll });
    } catch (error) {
      res.status(500).json({ msg: 'Server loi' });
    }
  }

  async handlePutUser(req, res) {
    try {
      const id = req.params.id;
      const { username, phoneNumber, address, role, status } = req.body;
      const updateUser = await User.update({ username, phoneNumber, address, role, status }, { where: { id: id } });
      res.status(200).json({ data: updateUser });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi' });
    }
  }

  async handlePutUserAth(req, res) {
    try {
      const id = req.params.id;
      const { username, phoneNumber, address } = req.body;
      const updateUser = await User.update({ username, phoneNumber, address }, { where: { id: id } });
      res.status(200).json({ data: updateUser });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  async handleGetUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      if (!user) {
        // If the user with the provided ID is not found
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async handleSearch(req, res) {
    const searchTerm = req.params.searchTerm;
    console.log(req.params.searchTerm);
    try {
      const userAll = await User.findAll({
        where: {
          username: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      });
      res.status(200).json({ data: userAll });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server loi' });
    }
  }
}

module.exports = new UserController();
