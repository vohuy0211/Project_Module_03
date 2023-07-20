const sequelize = require('../../libs/database/connect.mysql');
const { DataTypes } = require('sequelize');
const oders = require('../models/oder.model');
const books = require('../models/book.model');

const OderItem = sequelize.define(
  'OderItem',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oders_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

OderItem.belongsTo(oders, { foreignKey: 'oders_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
OderItem.belongsTo(books, { foreignKey: 'book_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

OderItem.sync().then(() => {
  console.log('ok la');
});

module.exports = OderItem;
