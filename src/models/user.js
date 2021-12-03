const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

const Person = require('./person');
const sequelize = require('../db');

class User extends Model {}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      },
    },
    admin: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: false,
  }
);

User.belongsTo(Person, { foreignKey: { name: 'personId', allowNull: true }, as: 'details' });

module.exports = User;
