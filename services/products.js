const productsModels = require('../models/products');

const getAll = async () => {
  const query = await productsModels.getAll();
  return query;
};

const getProduct = async (id) => {
  if (id < 0) return null;

  const response = await productsModels.getProduct(id);
  if (!response) throw new Error('Product not found.');
  return response;
};

const create = async ({ name, quantity }) => {
  try {
    const product = await productsModels.isDouble(name);

    if (product) throw new Error('Product already exists.');

    const response = await productsModels.create({ name, quantity });
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

const update = async ({ id, name, quantity }) => {
  try {
    const product = await productsModels.getProduct(id);
    if (!product) throw new Error('Product doesn\'t exists');
    await productsModels.update({ id, name, quantity });
    return {
      id, name, quantity,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const remove = async (id) => {
  try {
    await productsModels.remove(id);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAll,
  getProduct,
  create,
  update,
  remove,
};