const sinon = require('sinon');
const { expect } = require('chai');
const service = require('../../../services/sales');
const {
  getAll,
  getSale,
  create,
  update,
} = require('../../../controllers/sales');

describe('Ao chamar o controller de getAll', () => {
  const response = {};
  const request = {};

  beforeEach(() => {
    request.body = {};

    response.status = sinon.stub()
      .returns(response);
    response.send = sinon.stub()
      .returns();
  })

  afterEach(() => {
    service.getAll.restore();
  });



  it('é chamado o status com o código 200', async () => {
    sinon.stub(service, 'getAll').resolves('PARAM');
    await getAll(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('é chamado o send com os sales', async () => {
    sinon.stub(service, 'getAll').resolves('PARAM');
    await getAll(request, response);

    expect(response.send.calledWith('PARAM')).to.be.equal(true);
  });

  it('retorna erro 500 quando acontece um erro', async () => {
    sinon.stub(service, 'getAll').rejects(new Error());
    await getAll(request, response);

    expect(response.status.calledWith(500)).to.be.equal(true);
    expect(response.send.calledWith({ message: 'Ops! Something went bad...' })).to.be.equal(true);
  });

})

describe('Ao chamar o controller de getSale', () => {
  const response = {};
  const request = {};

  beforeEach(() => {
    request.params = { id: 1 };

    response.status = sinon.stub()
      .returns(response);
    response.send = sinon.stub()
      .returns();
  })

  afterEach(() => {
    service.getSale.restore();
  });



  it('é chamado o status com o código 200 e envia o produto', async () => {
    sinon.stub(service, 'getSale').resolves('PARAM');
    await getSale(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.send.calledWith('PARAM')).to.be.equal(true);
  });

  it('retorna erro 404 quando acontece um erro', async () => {
    sinon.stub(service, 'getSale').rejects(new Error());
    await getSale(request, response);

    expect(response.status.calledWith(404)).to.be.equal(true);
    expect(response.send.calledWith({ message: 'Sale not found' })).to.be.eq(true);

  })
});

describe('Ao chamar o controller de create', () => {
  const response = {};
  const request = {};

  beforeEach(() => {
    request.body = { name: '', quantity: 10 };

    response.status = sinon.stub()
      .returns(response);
    response.send = sinon.stub()
      .returns();
  })

  afterEach(() => {
    service.create.restore();
  });



  it('é chamado o status com o código 201 e envia o sale', async () => {
    sinon.stub(service, 'create').resolves('PARAM');
    await create(request, response);
    expect(response.status.calledWith(201)).to.be.equal(true);
    expect(response.send.calledWith('PARAM')).to.be.equal(true);
  });

  it('retorna erro 409 quando acontece um erro', async () => {
    sinon.stub(service, 'create').rejects(new Error());
    await create(request, response);

    expect(response.status.calledWith(500)).to.be.equal(true);
    expect(response.send.calledWith({ message: 'Oops something went bad...' })).to.be.eq(true);

  })
});

describe('Ao chamar o controller de update', () => {
  const response = {};
  const request = {};

  beforeEach(() => {
    request.body = [];
    request.params = { id: 1 }

    response.status = sinon.stub()
      .returns(response);
    response.send = sinon.stub()
      .returns();
  })

  afterEach(() => {
    service.update.restore();
  });



  it('é chamado o status com o código 200 e envia o sale', async () => {
    sinon.stub(service, 'update').resolves('PARAM');
    await update(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.send.calledWith('PARAM')).to.be.equal(true);
  });

  it('retorna erro 404 quando acontece um erro', async () => {
    sinon.stub(service, 'update').rejects(new Error());
    await update(request, response);

    expect(response.status.calledWith(404)).to.be.equal(true);
    expect(response.send.calledWith({ message: 'Sale not found' })).to.be.eq(true);

  })
});