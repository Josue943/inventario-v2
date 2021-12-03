const router = require('express').Router();
const { Op } = require('sequelize');

const getPagination = require('../utils/getPagination');
const getPaginatedResponse = require('../utils/getPaginatedResponse');
const Person = require('../models/person');
const Supplier = require('../models/supplier');
const setSearch = require('../utils/setSearch');

router.get('', async (req, res) => {
  const where = {};
  if (req.query.search) where[Op.or] = setSearch(['name', 'phone', 'surnames'], req.query.search);

  const pagination = getPagination(req.query.limit, req.query.page);

  const suppliers = await Supplier.findAndCountAll({
    include: { model: Person, as: 'details', where },
    ...pagination,
  });

  res.send(getPaginatedResponse(suppliers, pagination.limit));
});

router.post('', async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.status(201).send(supplier);
});

router.patch('/:id', async (req, res) => {
  const supplier = await Supplier.update(req.body, { where: { id: req.params.id } });
  console.log(supplier, req.body, req.params.id, '111111');
  if (!supplier[0]) return res.status(404).send();
  res.send(supplier);
});

router.delete('/:id', async (req, res) => {
  const supplier = await Supplier.findByPk(req.params.id);

  await supplier.destroy();
  await Person.destroy({ where: { id: supplier.personId } });

  res.send();
});

module.exports = router;
