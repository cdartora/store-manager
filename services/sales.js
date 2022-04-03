const salesModels = require('../models/sales');

const getDate = () => {
  const today = new Date();
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date} ${time}`;
  return dateTime;
};

const parseQuery = (sale) => ({
  saleId: sale.sale_id,
  date: sale.date,
  productId: sale.product_id,
  quantity: sale.quantity,
});

const getAll = async () => {
  try {
    const query = await salesModels.getAll();
    return query.map(parseQuery);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getSale = async (id) => {
  if (typeof id < 0) return null;

  try {
    const response = await salesModels.getSale(id);
    return response.map(parseQuery);
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
};

const create = async (salesList) => {
  try {
    const response = await salesModels.create({ date: getDate(), salesList });
    return response;
  } catch (err) {
    throw new Error();
  }
};

const update = async ({ id, salesList }) => {
  try {
    const sale = await getSale(id);
    if (!sale) throw new Error();

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