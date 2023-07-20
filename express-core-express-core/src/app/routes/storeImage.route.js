const express = require('express');
const route = express.Router();
const multer = require('multer');
const uuidv4 = require('uuid/v4');
//cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

route.post('/', upload.single('editImage'), (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const fileData = {
    image: url + '/images/' + req.file.filename,
  };
  res.status(200).json({
    data: fileData,
  });
});

module.exports = route;
