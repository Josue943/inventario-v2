const { Op, Sequelize } = require('sequelize');
const router = require('express').Router();

const cloudinary = require('../cloudinary');
const getPagination = require('../utils/getPagination');
const getPaginatedResponse = require('../utils/getPaginatedResponse');
const Product = require('../models/product');
const setSearch = require('../utils/setSearch');
const upload = require('../middlewares/upload');

router.get('', async (req, res) => {
  const helper = { order: [['id', 'ASC']], where: {} };

  if (req.query.category) helper.where.categoryId = req.query.category;

  if (req.query.stock) helper.where.stock = { [Op.lte]: Sequelize.col('minStock') };

  if (req.query.search) helper.where[Op.or] = setSearch(['barCode', 'name'], req.query.search);

  if (req.query.expiration) helper.where.expiration = { [Op.ne]: null };

  if (req.query.sortBy) helper.order.unshift([req.query.sortBy, req.query.order || 'ASC']);

  if (req.query.enabled) helper.where.enabled = true;

  const pagination = getPagination(req.query.limit, req.query.page);

  const products = await Product.findAndCountAll({ ...helper, ...pagination });
  res.send(getPaginatedResponse(products, req.query.limit));
});

router.put('/:id/image', upload.single('image'), async (req, res) => {
  const response = await cloudinary.uploader.upload(req.file.path, { upload_preset: 'acuario' });
  await Product.update({ image: response.url }, { where: { id: req.params.id } });

  res.send();
});

router.get('/cloudinary/signature', async (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request({ timestamp }, process.env.API_SECRET);
  res.send({ signature, timestamp });
});

router.post('', async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).send(product);
});

router.patch('/:id', async (req, res) => {
  await Product.update(req.body, { where: { id: req.params.id } });
  res.send();
});

router.delete('/:id', async (req, res) => {
  const product = await Product.destroy({ where: { id: req.params.id } });
  if (!product) return res.status(404).send();
  res.send();
});

module.exports = router;
