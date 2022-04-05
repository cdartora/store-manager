const { expect } = require('chai');
const sinon = require('sinon');
const {
  getAll,
  getSale,
  create,
  update,
} = require('../../../services/sales');
const model = require('../../../models/sales');

describe('Busca todas as vendas', () => {
  it('Retorna todos as vendas', async () => {
    const fakeSales = [];
    sinon.stub(model, 'getAll').resolves(fakeSales);

    const response = await getAll();

    expect(response).to.deep.equal(fakeSales);

    model.getAll.restore();
  });

  it('Acusa exceção caso receba um erro', async () => {
    sinon.stub(model, 'getAll').rejects(new Error('rejeitado'));
    return getAll()
      .catch((err) => expect(err.message).to.be.eq('rejeitado'))
  })
});

describe('Busca uma venda específica', () => {

  afterEach(async () => {
    model.getSale.restore();
  });

  it('Retorna a venda com id específico', async () => {
    const sale = [{
      saleId: 1,
      productId: "produto A",
      quantity: 10,
      date: 'date',
    }];

    sinon.stub(model, 'getSale').resolves(sale)
    const response = await getSale();

    expect(response).to.deep.equal([{
      saleId: 1,
      productId: "produto A",
      quantity: 10,
      date: 'date',
    }]);
  });

  it('Retorna nulo caso o id seja menor que 0', async () => {
    sinon.stub(model, 'getSale').resolves();

    const response = await getSale(-1);

    expect(response).to.deep.equal(null);
  });

  it('Acusa exceção caso receba um erro', async () => {
    sinon.stub(model, 'getSale').rejects(new Error('rejeitado'));
    return getSale(2)
      .catch((err) => expect(err.message).to.be.eq('rejeitado'))
  })
});

describe('Cria uma venda no banco de dados', () => {

  it('Retorna a venda', async () => {
    const sale = 'sale';
    sinon.stub(model, 'create').resolves(sale);
    expect(await create(sale)).to.be.eq(sale);
    model.create.restore();
  });

  it('Acusa exceção caso receba um erro', async () => {
    sinon.stub(model, 'create').rejects(new Error(''));
    return create()
      .catch((err) => expect(err.message).to.be.eq(''))
  })
});

describe('Atualiza um produto no banco de dados', () => {
  afterEach(async () => {
    model.getSale.restore();
  });

  it('Acusa um erro caso não exista', async () => {
    sinon.stub(model, 'getSale').resolves(false);

    return update({ id: 1, salesList: [] })
      .catch(err => expect(err.message).to.be.eq(''))
  });

  it('Caso exista retorna o produto', async () => {
    sinon.stub(model, 'getSale').resolves(true);
    sinon.stub(model, 'update').resolves();
    const sale = { id: 1, salesList: [] };
    const response = await update(sale);
    expect(response).to.be.deep.eq({
      saleId: 1, itemUpdated: [],
    });
    model.update.restore();
  });
});
