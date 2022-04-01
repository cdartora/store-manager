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
  if (typeof id < 0) return null;

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
    const response = await salesModels.update({ id, salesList });
    return response;
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