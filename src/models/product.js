const { DataTypes, Model } = require('sequelize');

const Category = require('./category');
const Supplier = require('./supplier');
const sequelize = require('../db');

class Product extends Model {}

Product.init(
  {
    barCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: { min: 0, max: 99 },
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    presentation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    warranty: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    expiration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'products',
    sequelize,
    timestamps: false,
  }
);

Product.belongsTo(Supplier, { foreignKey: { name: 'supplierId' }, onDelete: 'RESTRICT' });
Product.belongsTo(Category, { foreignKey: { name: 'categoryId' }, onDelete: 'RESTRICT' });

module.exports = Product;
