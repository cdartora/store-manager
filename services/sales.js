const salesModels = require('../models/sales');
const productsModels = require('../models/products');

const getAll = async () => {
  try {
    const query = await salesModels.getAll();
    return query;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getSale = async (id) => {
  if (id < 0) return null;

  try {
    const response = await salesModels.getSale(id);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

const create = async (salesList) => {
  try {
    let response;
    await salesList.map(async ({ quantity, productId }) => {
      const product = await productsModels.getProduct(productId);
      console.log('-------------------product------------', product);
      if (product.quantity > quantity) {
        response = await salesModels.create(salesList);
      }
    });
    console.log('-------passa da condicional------');
    return response;
  } catch (err) {
    console.log('--erro camada service--');
    throw new Error();
  }
};

const update = async ({ id, salesList }) => {
  try {
    const sale = await salesModels.getSale(id);
    if (!sale) throw new Error('');

    await salesModels.update({ id, salesList });
    return {
      saleId: id,
      itemUpdated: salesList,
    };
  } catch (err) {
    throw new Error();
  }
};

const remove = async (id) => {
  try {
    await salesModels.remove(id);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAll,
  getSale,
  create,
  update,
  remove,
};