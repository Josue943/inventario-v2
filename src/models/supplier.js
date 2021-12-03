const { DataTypes, Model } = require('sequelize');

const Person = require('./person');
const sequelize = require('../db');

class Supplier extends Model {}

Supplier.init(
  {
    enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: 'suppliers', sequelize, timestamps: false }
);

Supplier.belongsTo(Person, { foreignKey: { name: 'personId', allowNull: false }, as: 'details' });

module.exports = Supplier;
