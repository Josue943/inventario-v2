const router = require('express').Router();
const { Op } = require('sequelize');

const getPagination = require('../utils/getPagination');
const getPaginatedResponse = require('../utils/getPaginatedResponse');
const Person = require('../models/person');
const setSearch = require('../utils/setSearch');

router.get('', async (req, res) => {
  const where = {};

  if (req.query.client) where.client = true;
  if (req.query.search) where[Op.or] = setSearch(['name'], req.query.search);

  const pagination = getPagination(req.query.limit, req.query.page);

  const people = await Person.findAndCountAll({ where, ...pagination });
  res.send(getPaginatedResponse(people, req.query.limit));
});

router.post('', async (req, res) => {
  const person = await Person.create(req.body);
  res.status(201).send(person);
});

router.patch('/:id', async (req, res) => {
  await Person.update(req.body, { where: { id: req.params.id } });
  res.send();
});

router.delete('/:id', async (req, res) => {
  await Person.destroy({ where: { id: req.params.id } });
  res.send();
});

router.get('/:id', async (req, res) => {
  const person = await Person.findByPk(req.params.id);
  if (!person) return res.status(404).send();
  res.send(person);
});

module.exports = router;
