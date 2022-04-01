const salesServices = require('../services/sales');

const getAll = async (_req, res) => {
  try {
    const sales = await salesServices.getAll();
    res.status(200).json(sales);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: 'Ops! Something went bad...' });
  }
};

const getSale = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesServices.getSale(id);
    res.status(200).json(sale);
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ message: 'Sale not found' });
  }
};

const create = async (req, res) => {
  const salesList = req.body;

  try {
    const response = await salesServices.create(salesList);
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send({ message: 'Oops something went bad...' });
  }
};

const update = async (_req, _res) => {

};

module.exports = {
  getAll,
  getSale,
  create,
  update,
};