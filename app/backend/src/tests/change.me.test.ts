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
import { generateToken } from '../middleware/auth/jwtValidate';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matche, matcheCreated, matcheFinished, matches} from './mocks/Matches.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {

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

  it('Testa se get /login/role retorna 401 caso não tenha nenhum token', async () => {

    const mock = SequelizeUsers.build(buildLoginUser)
    sinon.stub(SequelizeUsers, 'findByPk').resolves(mock);

    const result = await chai.request(app)
      .get('/login/role')
     
      
    expect(result.status).to.be.equal(401);
    expect(result.body).to.deep.equal( { message : "Token not found"});
  });

  it('Testa se get /login/role retorna 401 caso o token seja inválido', async () => {
      
      const mock = SequelizeUsers.build(buildLoginUser)
      sinon.stub(SequelizeUsers, 'findByPk').resolves(mock);
  
      const result = await chai.request(app)
        .get('/login/role')
        .set('Authorization', 'Bearer 123')
        
      expect(result.status).to.be.equal(401);
      expect(result.body).to.deep.equal( { message : "Token must be a valid token"});
  });

  it('Testa se get /login/role retorna 200 caso o token seja válido', async () => {

    const token = generateToken({ id: 1, username: 'User' });

    const mock = SequelizeUsers.build(buildLoginUser)
    sinon.stub(SequelizeUsers, 'findByPk').resolves(mock);
    
    const result = await chai.request(app)
      .get('/login/role')
      .set('Authorization', `Bearer ${token}`)

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal( { role : "admin"});
  });

  it('Testa se get /matches retorna 200', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const result = await chai.request(app)
      .get('/matches')

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(matches);
  });

  it('Testa se get /matches?inProgress=true retorna 200', async () => {
    const mockFindOne = SequelizeMatches.build(matches as any);
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockFindOne as any);

    const result = await chai.request(app)
      .get('/matches?inProgress=true')

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([matche]);
  });

  it('Testa se get /matches?inProgress=false retorna 200', async () => {
    const mockFindOne = SequelizeMatches.build(matches as any);
    sinon.stub(SequelizeMatches, 'findAll').resolves(mockFindOne as any);

    const result = await chai.request(app)
      .get('/matches?inProgress=false')

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([matcheFinished]);
  });


  it('Testa se patch /matches/:id/finish retorna 200', async () => {
    sinon.stub(SequelizeMatches, 'update').resolves([1] as any);

    const result = await chai.request(app)
      .patch('/matches/1/finish')

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal({ message: 'Finished' });
  });

  it('Testa se patch /matches/:id retorna 200', async () => {
    sinon.stub(SequelizeMatches, 'update').resolves([1] as any);

    const result = await chai.request(app)
      .patch('/matches/1')
      .send(matche)

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal({ message: 'Updated' });
  });

  it('Testa se post /matches retorna 200', async () => {

    const mockFindOne = SequelizeUsers.build(matche as any);
    sinon.stub(SequelizeMatches, 'findOne').resolves(mockFindOne);

    const result = await chai.request(app)
      .post('/matches')
      .send(matcheCreated)

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal(matcheCreated);
  });

});
