const db = require('../../db/connection');

const notes = db.get('notes');
const schema = require('./notes.schema');

const get = (req, res, next) => {
  notes.find({
    user_id: req.user._id,
  }).then((results) => {
    res.json(results);
  }).catch(next);
};

const createNote = (req, res, next) => {
  const result = schema.validate(req.body);
  if (!result.error) {
    // create foreign key!
    const note = {
      ...req.body,
      user_id: req.user._id,
    };
    // insert into db
    notes
      .insert(note)
      .then((createdNote) => {
        res.json(createdNote);
      });
  } else {
    const error = new Error(result.error);
    res.status(422);
    next(error);
  }
};

module.exports = {
  get,
  createNote,
};
