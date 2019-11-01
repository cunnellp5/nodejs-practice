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

const deleteNote = (req, res, next) => {
  notes.findOneAndDelete({
    title: req.body.title
  })
    .then((results) => { 
      res.json(results, 'deleted??')
    })
}

module.exports = {
  get,
  createNote,
  deleteNote
};
