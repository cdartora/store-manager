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
    console.error(err.message);
    throw new Error(err.message);
  }
};

module.exports = {
  getAll,
  getProduct,
};