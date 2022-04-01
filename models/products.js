const connection = require('./connection');

const getAll = async () => {
  const [query] = await connection.execute(
    'SELECT * FROM products ORDER BY id;',
  );
  return query;
};

const getProduct = async (id) => {
  const [[query]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );
  return query;
};

const isDouble = async (name) => {
  const [[double]] = await connection.execute(
    'SELECT * FROM products WHERE name = ?;',
    [name],
  );

  if (double) throw new Error('Product already exists.');
};

const create = async ({ name, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES(?, ?);',
    [name, quantity],
  );

  return {
    id: insertId, name, quantity,
  };
};

const update = async ({ id, name, quantity }) => {
  await connection.execute(
    `UPDATE products
    SET name = ?, quantity = ?
    WHERE id = ?;`,
    [name, quantity, id],
  );
};

const remove = async (id) => {
  try {
    const [{ affectedRows }] = await connection.execute(
      'DELETE FROM products WHERE id = ?;',
      [id],
    );
    if (!affectedRows) throw new Error('Product not found');
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAll,
  getProduct,
  isDouble,
  create,
  update,
  remove,
};