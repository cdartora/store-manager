const productsModels = require('../models/products');

const getAll = async () => {
  try {
    const query = await productsModels.getAll();
    console.log(query);
    return query;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getProduct = async (_id) => {

};

module.exports = {
  getAll,
  getProduct,
};