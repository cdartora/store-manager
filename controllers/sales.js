const salesServices = require('../services/sales');

const getAll = async (_req, res) => {
  try {
    const sales = await salesServices.getAll();
    res.status(200).send(sales);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: 'Ops! Something went bad...' });
  }
};

const getSale = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesServices.getSale(id);
    res.status(200).send(sale);
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

const update = async (req, res) => {
  const salesList = req.body;
  const { id } = req.params;
  try {
    const alterSale = await salesServices.update({ id, salesList });
    console.log(alterSale);
    res.status(200).send(alterSale);
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ message: 'Sale not found' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await salesServices.remove(id);
    return res.status(204).send();
  } catch (err) {
    return res.status(404).send({ message: 'Sale not found' });
  }
};

module.exports = {
  getAll,
  getSale,
  create,
  update,
  remove,
};