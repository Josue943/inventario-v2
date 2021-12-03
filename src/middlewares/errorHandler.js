const errors = {
  SequelizeForeignKeyConstraintError: 409,
  SequelizeValidationError: 400,
  SequelizeUniqueConstraintError: 400,
};

module.exports = (err, req, res, next) => {
  console.log('--------------');
  console.error(err);
  const code = errors[err.name] || 500;
  res.status(code).send(err);
};
