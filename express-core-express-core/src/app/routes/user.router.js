const express = require('express');
const UserController = require('../../controllers/user.Controllers');
const checkAuthentication = require('../middlewares/CheckAuth');
const router = express.Router();

router.post('/login', UserController.handleLogin);
router.post('/register', UserController.handleRegister);
router.get('/get-user/:id', UserController.handleGetUserById);
router.get('/get-user', UserController.handleGetUser);
// Người dùng sửa
router.patch('/patch-user/:id', UserController.handlePutUserAth);
// Admin
router.patch('/patch-user-admin/:id', UserController.handlePutUser);
router.get('/searchUser/:searchTerm', UserController.handleSearch);

router.get('/', (req, res) => {
  res.json('Ok');
});

module.exports = router;
