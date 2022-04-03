const { expect } = require('chai');
const sinon = require('sinon');
const {
  getAll,
  getProduct,
  isDouble,
  create,
  update,
  remove,
  getSale,
} = require('../../../models/sales');
const connection = require('../../../models/connection');

describe('Busca todos os produtos', () => {

  before(async () => {
    const fakeSales = [[
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ]];

    sinon.stub(connection, 'execute').resolves(fakeSales);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Retorna todos os produtos', async () => {

    const sales = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ];

    const response = await getAll();

    expect(response).to.deep.equal(sales);
  });
});

describe('Busca uma venda específica', () => {

  afterEach(async () => {
    connection.execute.restore();
  });

  it('Retorna o produto com id específico', async () => {
    const fakeSale = [[
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      }
    ]];

    sinon.stub(connection, 'execute').resolves(fakeSale);

    const sale = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      }
    ];

    const response = await getSale();

    expect(response).to.deep.equal(sale);
  });

  it('Acusa um erro caso não exista venda com o ID', async () => {
    const fakeSale = [[]];

    sinon.stub(connection, 'execute').resolves(fakeSale);

    return getSale()
      .catch((err) => expect(err.message).to.be.eq('Sale not found.'));
  });
});

describe('Busca uma venda pelo nome do produto', () => {

  afterEach(async () => {
    connection.execute.restore();
  });

  it('Acusa um erro caso já exista', async () => {
    sinon.stub(connection, 'execute').resolves([[true]]);
    return isDouble()
      .catch(err => expect(err.message).to.be.eq('Sale already exists.'))
  });

  it('Caso não exista retorna undefined', async () => {
    sinon.stub(connection, 'execute').resolves([[false]]);
    expect(await isDouble()).to.be.undefined;
  });
});

describe('Cria uma venda no banco de dados', () => {

  afterEach(async () => {
    connection.execute.restore();
  });

  it('Retorna o objeto do produto criado', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const response = await create({
      date: 'date',
      salesList: [
        { productId: 1, quantity: 15 },
      ],
    });
    expect(response).to.be.deep.eq({
      id: 1,
      itemsSold: [
        { productId: 1, quantity: 15 },
      ],
    });
  });
});

describe('Atualiza uma venda no banco de dados', () => {
  it('Retorna undefined', async () => {
    sinon.stub(connection, 'execute').resolves();
    expect(await update({ id: 1, salesList: [{ productId: 1, quantity: 10 }] })).to.be.undefined;
    connection.execute.restore();
  });
});

