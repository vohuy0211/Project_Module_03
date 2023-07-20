const sequelize = require('../../libs/database/connect.mysql');
const { DataTypes } = require('sequelize');
const user = require('../models/user.model');
// Taoj bảng Comment

const CommentUser = sequelize.define(
  'comment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'comment',
    timestamp: true,
  }
);
// Liên kết

CommentUser.belongsTo(user, { foreignKey: 'user_id' });

CommentUser.sync().then(() => {
  console.log('ok 1');
});

module.exports = CommentUser;
