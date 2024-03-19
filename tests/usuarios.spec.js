import app from '../app.js';
import request from 'supertest';
import { login } from './functions.js';

const token = await login('a@a.com', '12345678');

describe('Login /usuarios/loginUser', () => {
  test('Should return 200', async () => {
    const response = await request(app).post('/usuarios/loginUser').send({
      mail: 'a@a.com',
      contraseña: '12345678',
    });
    expect(response.statusCode).toBe(200);
  });

  test('Should return token', async () => {
    const token = await login('a@a.com', '12345678');
    expect(token).toBeDefined();
  });
});

describe('POST /usuarios', () => {
  test('Should return 400', async () => {
    const response = await request(app).post('/usuarios').send({
      mail: 'aeo@gmail.com',
    });
    // Not sended all data
    expect(response.statusCode).toBe(400);
  });

  test('Should return 201', async () => {
    const response = await request(app).post('/usuarios').send({
      dni: 661464,
      nombre: 'test',
      apellido: 'test',
      mail: 'test@test.com',
      contraseña: '12345678',
      rol: 'user',
    });
    expect(response.statusCode).toBe(201);
  });
});

describe('GET /usuarios', () => {
  test('Should return 200', async () => {
    const response = await request(app)
      .get('/usuarios')
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toBe(200);
  });

  test('Should return array', async () => {
    const response = await request(app)
      .get('/usuarios')
      .set('Authorization', 'Bearer ' + token);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('Should return tested user', async () => {
    const response = await request(app)
      .get('/usuarios?mail=test@test.com')
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toBe(200);
  });
});

describe('DELETE /usuarios', () => {
  test('Should return 200', async () => {
    const usuario = await request(app)
      .get('/usuarios?mail=test@test.com')
      .set('Authorization', 'Bearer ' + token);
    const id = usuario.body.id;
    const response = await request(app)
      .delete(`/usuarios/${id}`)
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toBe(200);
  });
});
