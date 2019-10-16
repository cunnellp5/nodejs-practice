const request = require('supertest');
const { expect } = require('chai');

const app = require('./../../app');
const db = require('./../../db/connection');

const users = db.get('users');
const notes = db.get('notes');

const newUser = {
  username: 'testuser',
  password: '12345678900',
};

const note = {
  title: 'hello',
  note: 'world',
};

describe('GET notes /api/v1/notes', () => {
  it('should respond with unauthorized if no user exists', async () => {
    const response = await request(app)
      .get('/api/v1/notes')
      .expect(401);
    expect(response.body.message).to.equal('🚫 Un-Authorized 🚫');
  });

  it('should respond with unauthorized if no password', async () => {
    const response = await request(app)
      .get('/api/v1/notes')
      .send({ username: 'testuser' })
      .expect(401);
    expect(response.body.message).to.equal('🚫 Un-Authorized 🚫');
  });


  it('should create a note if a user is signed in', async () => {
    await users.remove({});

    const signup = await request(app)
      .post('/auth/signup')
      .send(newUser)
      .expect(200);
    
    expect(signup.body).to.have.property('token');
    const token = signup.body.token;
    
    const createNote = await request(app)
      .post('/api/v1/notes')
      .send(note)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(createNote.body.title).to.equal('hello')
    expect(createNote.body.note).to.equal('world')
  });
})