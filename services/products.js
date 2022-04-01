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

const getProduct = async (id) => {
  if (typeof id < 0) return null;

  try {
    const response = await productsModels.getProduct(id);
    if (!response) throw new Error();
    return response;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
};

const create = async ({ name, quantity }) => {
  try {
    const product = await productsModels.isDouble(name);

    if (product) return new Error();

    const response = await productsModels.create({ name, quantity });
    return response;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

const update = async ({ id, name, quantity }) => {
  try {
    await productsModels.update({ id, name, quantity });
    return {
      id, name, quantity,
    };
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
};

module.exports = {
  getAll,
  getProduct,
  create,
  update,
};