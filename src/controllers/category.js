const router = require('express').Router();
const { Op } = require('sequelize');

const Category = require('../models/category');
const getPagination = require('../utils/getPagination');
const getPaginatedResponse = require('../utils/getPaginatedResponse');
const setSearch = require('../utils/setSearch');

//sortBy  order
router.get('', async (req, res) => {
  const where = {};

  if (req.query.search) where[Op.or] = setSearch(['name'], req.query.search);

  if (req.query.enabled) where.enabled = true;

  const pagination = getPagination(req.query.limit, req.query.page);

  const categories = await Category.findAndCountAll({ where, ...pagination });

  res.send(getPaginatedResponse(categories, pagination.limit));
});

router.post('', async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).send(category);
});

router.patch('/:id', async (req, res) => {
  await Category.update(req.body, { where: { id: req.params.id } });
  res.send();
});

router.delete('/:id', async (req, res) => {
  const category = await Category.destroy({ where: { id: req.params.id } });
  if (!category) return res.status(404).send();
  res.send();
});

module.exports = router;
