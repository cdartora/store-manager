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

const productsRouter = require('./routes/productsRouter');

app.get('/products', productsController.getAll);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
