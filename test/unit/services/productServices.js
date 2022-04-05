const { expect } = require('chai');
const sinon = require('sinon');
const {
  getAll,
  getProduct,
  create,
  update,
  remove,
} = require('../../../services/products');
const model = require('../../../models/products');

describe('Busca todos os produtos', () => {

  before(async () => {
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

    sinon.stub(model, 'getAll').resolves(fakeProducts);
  });

  after(async () => {
    model.getAll.restore();
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

  afterEach(async () => {
    model.getProduct.restore();
  });

  it('Retorna o produto com id específico', async () => {
    const product = {
      id: 1,
      name: "produto A",
      quantity: 10
    };

    sinon.stub(model, 'getProduct').resolves(product)
    const response = await getProduct();

    expect(response).to.deep.equal(product);
  });

  it('Acusa erro caso não encontre produto', async () => {
    const product = undefined;

    sinon.stub(model, 'getProduct').resolves(product)

    return getProduct()
      .catch((err) => expect(err.message).to.be.eq('Product not found.'));
  });

  it('Retorna nulo caso o id seja menor que 0', async () => {
    sinon.stub(model, 'getProduct').resolves();

    const response = await getProduct(-1);

    expect(response).to.deep.equal(null);
  });
});

describe('Cria um produto no banco de dados', () => {
  it('Acusa um erro caso já exista', async () => {
    const product = { name: 'Marthelo do Hulk', quantity: 2 };

    sinon.stub(model, 'isDouble').resolves(true);

    return create(product)
      .catch(err => {
        model.isDouble.restore();
        return expect(err.message).to.be.eq('Product already exists.')
      })
  });

  it('Caso não exista retorna o produto', async () => {
    const product = { name: 'Marthelo do Hulk', quantity: 2 };
    sinon.stub(model, 'isDouble').resolves(false);
    sinon.stub(model, 'create').resolves(product);
    expect(await create(product)).to.be.eq(product);
    model.create.restore();
  });
});

describe('Atualiza um produto no banco de dados', () => {
  it('Acusa um erro caso não exista', async () => {
    const product = { id: 1, name: 'Marthelo do Hulk', quantity: 2 };

    sinon.stub(model, 'getProduct').resolves(false);

    return update(product)
      .catch(err => {
        model.getProduct.restore();
        return expect(err.message).to.be.eq('Product doesn\'t exists')
      })
  });

  // NÃO ESTA PASSANDO
  it('Caso exista retorna o produto', async () => {
    const product = { id: 1, name: 'Marthelo do Hulk', quantity: 2 };
    sinon.stub(model, 'getProduct').resolves(true);
    sinon.stub(model, 'update').resolves();
    const response = await update(product);
    expect(response).to.be.deep.eq(product);
    model.update.restore();
    model.getProduct.restore();
  });
});

describe('Deleta um produto no banco de dados', () => {
  afterEach(async () => {
    model.remove.restore();
  });

  it('Caso de algum erro joga uma exeção', async () => {
    sinon.stub(model, 'remove').rejects(new Error('rejeitado'));
    return await remove()
      .catch((err) => {
        return expect(err.message).to.be.eq('rejeitado');
      })
  })

  it('Caso seja deletado retorna undefined', async () => {
    sinon.stub(model, 'remove').resolves();
    expect(await remove()).to.be.undefined;
  })

});
