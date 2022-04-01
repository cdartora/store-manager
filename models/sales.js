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

const isDouble = async (name) => {
  const [[double]] = await connection.execute(
    'SELECT * FROM sales WHERE name = ?;',
    [name],
  );

  if (double) throw new Error();
};

const getDate = () => {
  const today = new Date();
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date} ${time}`;
  return dateTime;
};

const create = async (salesList) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES(?);',
    [getDate()],
  );

  salesList.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      `INSERT INTO sales_products (sale_id, product_id, quantity)
        VALUES(?, ?, ?);`,
      [insertId, productId, quantity],
    );
  });

  return {
    id: insertId,
    itemsSold: salesList,
  };
};

const update = async ({ id, name, quantity }) => {
  const product = await getSale(id);
  if (!product) throw new Error();
  await connection.execute(
    `UPDATE products
    SET name = ?, quantity = ?
    WHERE id = ?;`,
    [name, quantity, id],
  );
};

module.exports = {
  getAll,
  getSale,
  isDouble,
  create,
  update,
};