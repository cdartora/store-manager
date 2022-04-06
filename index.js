const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const productsController = require('./controllers/products');
const productsMiddleware = require('./middlewares/products');
const salesController = require('./controllers/sales');
const salesMiddleware = require('./middlewares/sales');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// PRODUCTS
app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getProduct);
app.post('/products', productsMiddleware.validate, productsController.create);
app.put('/products/:id', productsMiddleware.validate, productsController.update);
app.delete('/products/:id', productsController.remove);

// SALES
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getSale);
app.post('/sales', salesMiddleware.validate, salesController.create);
app.put('/sales/:id', salesMiddleware.validate, salesController.update);
app.delete('/sales/:id', salesController.remove);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
