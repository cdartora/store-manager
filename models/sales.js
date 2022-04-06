const connection = require('./connection');

const getAll = async () => {
  const [query] = await connection.execute(
    `SELECT sale_id as saleId, date, product_id as productId, quantity FROM StoreManager.sales s
      INNER JOIN StoreManager.sales_products sp
      ON sale_id = id
      ORDER BY sp.sale_id, sp.product_id;`,
  );
  return query;
};

const getSale = async (id) => {
  const [query] = await connection.execute(
    `SELECT date, product_id AS productId, quantity FROM StoreManager.sales s
      INNER JOIN StoreManager.sales_products sp
      ON sale_id = id
      WHERE sale_id = ?
      ORDER BY sp.sale_id, sp.product_id;`,
    [id],
  );
  if (query.length === 0) {
    throw new Error('Sale not found.');
  }
  return query;
};

const isDouble = async (name) => {
  const [[double]] = await connection.execute(
    'SELECT * FROM sales WHERE name = ?;',
    [name],
  );

  if (double) throw new Error('Sale already exists.');
};

const create = async (salesList) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES(NOW());',
  );

  const insertPromises = salesList.map(({ productId, quantity }) => connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES(?, ?, ?);`,
    [insertId, productId, quantity],
  ));
  await Promise.all(insertPromises);

  const productPromises = salesList.map(({ productId, quantity }) => connection.execute(
    'UPDATE products SET quantity = (quantity - ?) WHERE id = ?;',
    [quantity, productId],
  ));
  await Promise.all(productPromises);

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

const remove = async (id) => {
  const [salesDetails] = await connection.execute(
    `SELECT product_id productId, quantity FROM sales_products
    WHERE sale_id = ?;`, [id],
  );

  const [{ affectedRows: sales }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?;',
    [id],
  );

  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?;',
    [id],
  );
  if (!sales) throw new Error('Product not found');

  const productPromises = salesDetails.map(({ productId, quantity }) => connection.execute(
    'UPDATE products SET quantity = (quantity + ?) WHERE id = ?;',
    [quantity, productId],
  ));

  await Promise.all(productPromises);
};

module.exports = {
  getAll,
  getSale,
  isDouble,
  create,
  update,
  remove,
};