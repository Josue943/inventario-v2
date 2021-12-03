const { DataTypes, Model } = require('sequelize');

const sequelize = require('../db');

class Person extends Model {}

Person.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    surnames: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    documentId: { type: DataTypes.STRING, allowNull: false, unique: true },
    documentType: { type: DataTypes.STRING, defaultValue: 'otro' },
    province: { type: DataTypes.STRING, allowNull: true },
    canton: { type: DataTypes.STRING, allowNull: true },
    district: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    client: { type: DataTypes.BOOLEAN, allowNull: true },
  },
  {
    tableName: 'people',
    sequelize,
    timestamps: false,
  }
);

module.exports = Person;
