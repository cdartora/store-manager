const connection = require('./connection');

const getAll = async () => {
  try {
    const [query] = await connection.execute(
      'SELECT * FROM products ORDER BY id;',
    );
    return query;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getProduct = async (id) => {
  try {
    const [[query]] = await connection.execute(
      'SELECT * FROM products WHERE id = ?;',
      [id],
    );
    return query;
  } catch (err) {
    throw new Error(err.message);
  }
};

const isDouble = async (name) => {
  const [[double]] = await connection.execute(
    'SELECT * FROM products WHERE name = ?;',
    [name],
  );

  if (double) throw new Error();
};

const create = async ({ name, quantity }) => {
  try {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO products (name, quantity) VALUES(?, ?);',
      [name, quantity],
    );

    return {
      id: insertId, name, quantity,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async ({ id, name, quantity }) => {
  const product = await getProduct(id);
  if (!product) throw new Error();
  await connection.execute(
    `UPDATE products
    SET name = ?, quantity = ?
    WHERE id = ?;`,
    [name, quantity, id],
  );
};

const remove = async (id) => {
  try {
    console.log('models');
    const [{ affectedRows }] = await connection.execute(
      'DELETE FROM products WHERE id = ?;',
      [id],
    );
    if (!affectedRows) throw new Error();
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