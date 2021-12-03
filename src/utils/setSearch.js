const { Op } = require('sequelize');

module.exports = (fields, search) => {
  const searchParams = [];
  for (const item of fields) searchParams.push({ [item]: { [Op.like]: `%${search}%` } });
  return searchParams;
};
