const request = require('supertest');
const { expect } = require('chai');

const app = require('./../../app');
const db = require('./../../db/connection');

const users = db.get('users');
const notes = db.get('notes');

const loggedInUser = {
  username: 'test',
  password: '12345678890',
  _id: 2,
};

const note = {
  title: 'hello',
  note: 'world',
};

describe('GET notes /api/v1/notes', () => {
  before(async () => {
    await users.remove({});
    await notes.remove({});
    await users.insert({
      username: loggedInUser.username,
      password: loggedInUser.password,
    });
    await notes.insert({
      title: note.title,
      note: note.note,
    });
  });

  it('should respond with unauthorized if no user exists', async () => {
    const response = await request(app)
      .get('/api/v1/notes')
      .expect(401);
    expect(response.body.message).to.equal('🚫 Un-Authorized 🚫');
  });

  it('should return notes if a user is signed in', async () => {
    const response = await request(app)
      .get('/api/v1/notes')
      .expect(200);
    expect(response.body).to.have('results');
  });
});
