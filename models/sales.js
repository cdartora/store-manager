const connection = require('./connection');

const getAll = async () => {
  const [query] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity FROM StoreManager.sales s
      INNER JOIN StoreManager.sales_products sp
      ON sale_id = id
      ORDER BY sp.sale_id, sp.product_id;`,
  );
  return query;
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
    if (query.length === 0) {
      console.log('entrou no if');
      throw new Error('Sale not found.');
    }
    return query;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
};

const isDouble = async (name) => {
  const [[double]] = await connection.execute(
    'SELECT * FROM sales WHERE name = ?;',
    [name],
  );

  if (double) throw new Error('Sale already exists.');
};

const create = async ({ date, salesList }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES(?);',
    [date],
  );

  const promises = salesList.map(({ productId, quantity }) => connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES(?, ?, ?);`,
    [insertId, productId, quantity],
  ));

  await Promise.all(promises);

  return {
    id: insertId,
    itemsSold: salesList,
  };
};

const update = async ({ id, salesList }) => {
  const promises = salesList.map(({ productId, quantity }) => connection.execute(
    `UPDATE sales_products
      SET product_id = ?, quantity = ?
      WHERE sale_id = ? AND product_id = ?;`,
    [productId, quantity, id, productId],
  ));

  await Promise.all(promises);
};

module.exports = {
  getAll,
  getSale,
  isDouble,
  create,
  update,
};