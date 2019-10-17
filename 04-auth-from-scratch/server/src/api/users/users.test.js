const request = require('supertest');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');

const app = require('./../../app');
const db = require('./../../db/connection');

const users = db.get('users');

describe('GET users', () => {
  let token;
  before(async () => {
    await users.remove({});
    await users.insert({
      username: 'Admin',
      password: await bcrypt.hash('adminpassword', 12),
      active: true,
      role: 'admin',
    })
    await users.insert({
      username: 'test',
      password: await bcrypt.hash('testpasswordtest', 12),
      active: true,
      role: 'user',
    })
  });

  it('return unauthorized if no one is signed in', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .expect(401)
    expect(response.body.message).to.equal('🚫 Un-Authorized 🚫')
  })
  it('view all users if logged in as admin', async () => {
    const login = await request(app)
      .post('/auth/login')
      .send({username: 'Admin', password: 'adminpassword'})
      .expect(200)
    expect(login.body).to.have.property('token');

    const token = login.body.token;

    const userResponse = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    expect(userResponse.body.length).to.equal(2);
    expect(userResponse.body[1].username).to.equal('test');
  })
})
