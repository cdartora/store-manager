const salesModels = require('../models/sales');

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
    console.error(err.message);
    throw new Error(err.message);
  }
};

const create = async (salesList) => {
  try {
    const response = await salesModels.create(salesList);
    return response;
  } catch (err) {
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
    console.log(err.message);
    throw new Error();
  }
};

module.exports = {
  getAll,
  getSale,
  create,
  update,
};