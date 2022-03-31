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

const getProduct = async (_req, _res) => {

};

module.exports = {
  getAll,
  getProduct,
};