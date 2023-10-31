import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeModel';

import { Response } from 'superagent';
import { teams } from './mocks/Teams.mock';

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

  afterEach(() => {
    sinon.restore();
  })

});
