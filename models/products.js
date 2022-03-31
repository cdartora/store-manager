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

const getProduct = async () => {

};

module.exports = {
  getAll,
  getProduct,
};