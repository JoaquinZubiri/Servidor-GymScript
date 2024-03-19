import app from '../app.js';
import request from 'supertest';
import { login } from './functions.js';

const token = await login('a@a.com', '12345678');

describe('POST /planes', () => {
  test('Should return 401', async () => {
    const response = await request(app).post('/planes').send({
      nombre: 'Plan Testing',
      precioMensual: 9999,
      descripcion: 'Descripcion del plan testing',
    });
    // No token send
    expect(response.statusCode).toBe(401);
  });

  test('Should return 201', async () => {
    const response = await request(app)
      .post('/planes')
      .set('Authorization', 'Bearer ' + token)
      .send({
        nombre: 'Plan Testing',
        precioMensual: 9999,
        descripcion: 'Descripcion del plan testing',
      });
    expect(response.statusCode).toBe(201);
  });
});

describe('GET /planes', () => {
  test('Should return 200', async () => {
    const response = await request(app).get('/planes');
    expect(response.statusCode).toBe(200);
  });

  test('Should return array', async () => {
    const response = await request(app).get('/planes');
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('DELETE /planes/:id', () => {
  test('Should return 401', async () => {
    const response = await request(app).delete('/planes/0');
    expect(response.statusCode).toBe(401);
  });

  test('Should return 404', async () => {
    const response = await request(app)
      .delete('/planes/0')
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toBe(404);
  });

  test('Should return 200', async () => {
    // GET PLAN ID
    const planes = await request(app).get('/planes');
    // It's assumed that the last plan is the one that was created in the previous test
    const id = planes.body[planes.body.length - 1].id;
    const response = await request(app)
      .delete(`/planes/${id}`)
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toBe(200);
  });
});
