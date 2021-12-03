const { DataTypes, Model } = require('sequelize');

const Product = require('../models/product');
const Sale = require('../models/sale');
const sequelize = require('../db');

class SaleProduct extends Model {}

SaleProduct.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { tableName: 'saleProduct', sequelize, timestamps: false }
);

Sale.belongsToMany(Product, { as: 'products', through: SaleProduct, foreignKey: 'saleId' });
Product.belongsToMany(Sale, { as: 'saleDetails', through: SaleProduct, foreignKey: 'productId', onDelete: 'RESTRICT' });

module.exports = SaleProduct;
