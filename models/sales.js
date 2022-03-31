const connection = require('./connection');

const parseQuery = (sale) => ({
  saleId: sale.sale_id,
  date: sale.date,
  productId: sale.product_id,
  quantity: sale.quantity,
});

const getAll = async () => {
  try {
    const [query] = await connection.execute(
      `SELECT sale_id, date, product_id, quantity FROM StoreManager.sales s
      INNER JOIN StoreManager.sales_products sp
      ON sale_id = id
      ORDER BY sp.sale_id, sp.product_id;`,
    );
    return query.map(parseQuery);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getSale = async (id) => {
  try {
    const [query] = await connection.execute(
      `SELECT date, product_id, quantity FROM StoreManager.sales s
      INNER JOIN StoreManager.sales_products sp
      ON sale_id = id
      WHERE sale_id = ?
      ORDER BY sp.sale_id, sp.product_id;`,
      [id],
    );
    if (query.length === 0) throw new Error();
    return query.map(parseQuery);
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
};

module.exports = {
  getAll,
  getSale,
};