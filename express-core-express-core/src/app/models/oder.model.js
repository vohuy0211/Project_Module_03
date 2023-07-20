const sequelize = require('../../libs/database/connect.mysql');
const { DataTypes } = require('sequelize');
const user = require('../models/user.model');

const Oder = sequelize.define(
  'oder',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    timestamps: true,
  }
);

Oder.belongsTo(user, { foreignKey: 'user_id' });

Oder.sync().then(() => {
  console.log('ok la');
});

module.exports = Oder;
