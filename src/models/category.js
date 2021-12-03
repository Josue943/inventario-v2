const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Category extends Model {}

Category.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: 'categories', sequelize, timestamps: false }
);

module.exports = Category;
