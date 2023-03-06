import {
  afterEach, beforeEach, describe, expect, it,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app';

let server;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('Deve retornar lista de editoras', async () => {
    const res = await request(app)
      .get('/editoras')
      .set('Accept', 'aplication/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(res.body[0].email).toEqual('e@e.com');
  });
});

let idResposta;

describe('POST em /editoras', () => {
  it('Deve adicionar nova editora', async () => {
    const resposta = await request(app)
      .post('/editoras')
      .send({
        nome: 'CDC',
        cidade: 'São Paulo',
        email: 'c@co.com',
      })
      .expect(201);
    idResposta = resposta.body.content.id;
  });
});

describe('DEL em /editoras', () => {
  it('Deletar recurso adicionado', async () => {
    await request(app)
      .delete(`/editoras/${idResposta}`);
  });
});
