const moment = require('moment');
const router = require('express').Router();
const sequelize = require('../db');
const { Op } = require('sequelize');

const Product = require('../models/product');
const Return = require('../models/return');
const SaleProduct = require('../models/saleProduct');
const getPaginatedResponse = require('../utils/getPaginatedResponse');
const getPagination = require('../utils/getPagination');

router.post('', async (req, res) => {
  await sequelize.transaction(async transaction => {
    const where = { productId: req.body.productId, saleId: req.body.saleId };
    await Return.create(req.body, { transaction });

    if (req.body.delete) await SaleProduct.destroy({ where, transaction });
    else
      await SaleProduct.update(
        { quantity: sequelize.literal(`quantity - ${req.body.quantity} `) },
        { where, transaction }
      );
  });

  res.status(201).send();
});

router.get('', async (req, res) => {
  const where = {};

  if (req.query.startDate && req.query.endDate) {
    where.date = {
      [Op.between]: [
        moment(req.query.startDate).startOf('day').toDate(),
        moment(req.query.endDate).endOf('day').toDate(),
      ],
    };
  }

  const pagination = getPagination(req.query.limit, req.query.page);
  const returns = await Return.findAndCountAll({
    where,
    distinct: true,
    include: { model: Product, attributes: ['name'], as: 'product' },
    ...pagination,
  });

  res.send(getPaginatedResponse(returns, pagination.limit));
});

router.get('/:saleId', async (req, res) => {
  const returns = await Return.findAll({
    where: { saleId: req.params.saleId },
    include: { model: Product, attributes: ['name'], as: 'product' },
  });
  res.send(returns);
});

module.exports = router;
