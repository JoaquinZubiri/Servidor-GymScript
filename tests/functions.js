import app from '../app.js'
import request from 'supertest'

export const login = async (email, password) => {
  const login = await request(app).post('/usuarios/loginUser').send({
    mail: email,
    contraseña: password
  })
  return login.body
}
