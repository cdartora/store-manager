const { expect } = require('chai');
const sinon = require('sinon');
const {
  getAll,
  getProduct,
  isDouble,
  create,
  update,
  remove,
} = require('../../../models/products');
const connection = require('../../../models/connection');

describe('Busca todos os produtos', () => {

  before(async () => {
    const fakeProducts = [[
      {
        id: 1,
        name: "produto A",
        quantity: 10
      },
      {
        id: 2,
        name: "produto B",
        quantity: 20
      }
    ]];

    sinon.stub(connection, 'execute').resolves(fakeProducts);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Retorna todos os produtos', async () => {

    const fakeProducts = [
      {
        id: 1,
        name: "produto A",
        quantity: 10
      },
      {
        id: 2,
        name: "produto B",
        quantity: 20
      }
    ];

    const response = await getAll();

    expect(response).to.deep.equal(fakeProducts);
  });
});

describe('Busca um produto específico', () => {

  before(async () => {
    const fakeProduct = [[
      {
        id: 1,
        name: "produto A",
        quantity: 10,
      }
    ]];

    sinon.stub(connection, 'execute').resolves(fakeProduct);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Retorna o produto com id específico', async () => {

    const product = {
      id: 1,
      name: "produto A",
      quantity: 10
    };

    const response = await getProduct(1);

    expect(response).to.deep.equal(product);
  });
});

describe('Busca um produto por nome', () => {

  afterEach(async () => {
    connection.execute.restore();
  });

  it('Acusa um erro caso já exista', async () => {
    sinon.stub(connection, 'execute').resolves([[true]]);
    return isDouble()
      .catch(err => expect(err.message).to.be.eq('Product already exists.'))
  });

  it('Caso não exista retorna undefined', async () => {
    sinon.stub(connection, 'execute').resolves([[false]]);
    expect(await isDouble()).to.be.undefined;
  });
});

describe('Cria um produto no banco de dados', () => {

  afterEach(async () => {
    connection.execute.restore();
  });

  it('Retorna o objeto do produto criado', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const response = await create({ name: 'Mousepad', quantity: 2 });
    expect(response).to.be.deep.eq({ id: 1, name: 'Mousepad', quantity: 2 });
  });
});

describe('Atualiza um produto no banco de dados', () => {
  it('Retorna undefined', async () => {
    sinon.stub(connection, 'execute').resolves();
    expect(await update({ id: 1, name: 'Mousepad', quantity: 1 })).to.be.undefined;
    connection.execute.restore();
  });
});

describe('Deleta um produto no banco de dados', () => {
  afterEach(async () => {
    connection.execute.restore();
  });

  it('Acusa um erro caso nenhuma linha seja afetada', async () => {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: false }]);
    return remove()
      .catch(err => expect(err.message).to.be.eq('Product not found'))
  });

  it('Caso seja deletado retorna undefined', async () => {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: true }]);
    expect(await remove()).to.be.undefined;
  });
});
