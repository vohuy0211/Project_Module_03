const sequelize = require('../../libs/database/connect.mysql');
const { DataTypes } = require('sequelize'); // Import the built-in data types

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER, // Chuyển kiểu dữ liệu thành INTEGER
      allowNull: false,
      defaultValue: 1, // Đặt giá trị mặc định là 1
    },
    status: {
      type: DataTypes.INTEGER, // Chuyển kiểu dữ liệu thành INTEGER
      allowNull: false,
      defaultValue: 1, // Đặt giá trị mặc định là 1
    },
  },
  {
    timestamps: true,
  }
);

User.sync().then(() => {
  console.log('ok');
});

module.exports = User;
