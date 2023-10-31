import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeModel';

import { Response } from 'superagent';
import { teams } from './mocks/Teams.mock';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { buildLoginUser, existingUserWithWrongPasswordBody, loginUser
  , notHaveEmail, notHavePassword } from './mocks/Login.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ... 

  //   expect(...)
  // });

  it('Testa se a rota / está funcionando', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.eql({ ok: true });
  });
  it('Testa se get /teams retorna 200', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const {status, body} = await chai
      .request(app)
      .get('/teams');

      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(teams);
  });

  it('Testa se get /teams/:id retorna 200', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(teams[0] as any);

    const {status, body} = await chai
      .request(app)
      .get('/teams/1');

      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(teams[0]);
  });
  
  it('Testa se get /teams/:id retorna 404', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const {status, body} = await chai
      .request(app)
      .get('/teams/1');

      expect(status).to.be.equal(404);
      expect(body).to.deep.equal({message: 'Team not found'});
  });

  it('Testa se post /login retorna 200', async () => {
  

    const mockFindOne = SequelizeUsers.build(buildLoginUser);
    sinon.stub(SequelizeUsers, 'findOne').resolves(mockFindOne);

    const {status, body} = await chai.request(app).post('/login').send(loginUser);
    
    expect(status).to.be.equal(200);
    expect(body).to.have.property('token');
  });

  afterEach(() => {
    sinon.restore();
  })

  it('Testa se post /login retorna 401 ao não receber 1 email', async () => {
    const {status, body} = await chai.request(app).post('/login').send(notHaveEmail);
    
    expect(status).to.be.equal(400);
    expect(body).to.have.property('message');
  });

  it('Testa se post /login retorna 401 ao não receber 1 senha', async () => {
    const {status, body} = await chai.request(app).post('/login').send(notHavePassword);

    expect(status).to.be.equal(400);
    expect(body).to.have.property('message');
  });

  it('Testa ao receber 1 email existente e uma senha inválida', async () => {
    const mockFindOne = SequelizeUsers.build(buildLoginUser);
    sinon.stub(SequelizeUsers, 'findOne').resolves(mockFindOne);

    const {status, body} = await chai.request(app).post('/login').send(existingUserWithWrongPasswordBody);

    expect(status).to.be.equal(401);
    expect(body).to.have.property('message');
  });


});
