const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { Op } = require('sequelize');

const User = require('../models/user');
const Person = require('../models/person');
const setSearch = require('../utils/setSearch');
const getPagination = require('../utils/getPagination.js');
const getPaginatedResponse = require('../utils/getPaginatedResponse.js');

router.get('', async (req, res) => {
  const where = {};
  if (req.query.search) where[Op.or] = setSearch(['name', 'surnames', 'phone'], req.query.search);

  const pagination = getPagination(req.query.limit, req.query.page);

  const users = await User.findAndCountAll({
    attributes: { exclude: ['personId', 'password'] },
    include: {
      model: Person,
      as: 'details',
      where,
      attributes: { exclude: ['province', 'canton', 'district', 'client'] },
    },
    ...pagination,
  });

  res.send(getPaginatedResponse(users, pagination.limit));
});

router.post('', async (req, res) => {
  const user = await User.create(req.body);
  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
  res.status(201).send({ user, token });
});

router.patch('/:id', async (req, res) => {
  await User.update(req.body, { where: { id: req.params.id } });
  res.send();
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);

  await user.destroy();
  await Person.destroy({ where: { id: user.personId } });

  res.send();
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  const isMatch = bcrypt.compareSync(req.body.password, user.password);
  if (!isMatch) return res.status(404).send();
  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
  res.send({ user, token });
});

router.post('/login/auto', async (req, res) => {
  const { userId } = jwt.verify(req.body.token, process.env.SECRET_KEY);
  const user = await User.findByPk(userId);
  const token = jwt.sign({ userId }, process.env.SECRET_KEY);
  res.send({ user, token });
});

module.exports = router;
