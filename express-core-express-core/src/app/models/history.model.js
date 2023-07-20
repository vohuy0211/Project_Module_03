const sequelize = require('../../libs/database/connect.mysql');
const { DataTypes } = require('sequelize');
const Oders = require('../models/oder.model');
const Books = require('../models/book.model');

const History = sequelize.define(
  'History',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    oders_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    books_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
  }
);

History.belongsTo(Oders, { foreignKey: 'oders_id', onDelete: 'CASCADE' });
Oders.hasMany(History, { foreignKey: 'oders_id' });

History.belongsTo(Books, { foreignKey: 'books_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Books.hasMany(History, { foreignKey: 'books_id' });
History.sync().then(() => {
  console.log('ok nhé');
});

module.exports = History;
