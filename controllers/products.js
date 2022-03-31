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

module.exports = {
  getAll,
  getProduct,
};