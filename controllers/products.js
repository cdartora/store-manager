const productsServices = require('../services/products');

const getAll = async (_req, res) => {
  try {
    const products = await productsServices.getAll();
    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: 'Ops! Something went bad...' });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsServices.getProduct(id);
    res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ message: 'Product not found' });
  }
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const newProduct = await productsServices.create({ name, quantity });
    res.status(201).send(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(409).send({ message: 'Product already exists' });
  }
};

const update = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const alterProduct = await productsServices.update({ id, name, quantity });
    res.status(200).send(alterProduct);
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ message: 'Product not found' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await productsServices.remove(id);
    return res.status(204).send();
  } catch (err) {
    return res.status(404).send({ message: 'Product not found' });
  }
};

module.exports = {
  getAll,
  getProduct,
  create,
  update,
  remove,
};