const { DataTypes, Model, NOW } = require('sequelize');

const Product = require('./product');
const Sale = require('./sale');

const sequelize = require('../db');

class Return extends Model {}

Return.init(
  {
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: NOW,
    },
  },
  {
    tableName: 'returns',
    sequelize,
    timestamps: false,
  }
);

Return.belongsTo(Product, { foreignKey: { name: 'productId', allowNull: false }, as: 'product' });
Return.belongsTo(Sale, { foreignKey: { name: 'saleId', allowNull: false } });

module.exports = Return;
