const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const productsController = require('./controllers/products');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// PRODUCTS
app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getProduct);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
