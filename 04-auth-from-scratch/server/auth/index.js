const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');

const db = require('./../db/connection');
const users = db.get('users');
users.createIndex('username', { unique: true });

const router = express.Router();

const schema = Joi.object({
    username: Joi.string()
        .regex(/(^[a-zA-Z0-9_]*$)/)
        .min(2)
        .max(30)
        .required(),
 
    password: Joi.string()
        .min(10)
        .required()

})
// any route in here is pre-pended with /auth

router.get('/', (req, res) => {
    res.json({
        message: 'Auth router working!'
    })
})

router.post('/signup', (req, res, next) => {
    const result = schema.validate(req.body);
    if (!result.error) {
        // make sure user is uniqe
        users.findOne({
            username: req.body.username
        }).then((user) => {
            // if user is undefined, username is not in db, otherwise duplicate user detecte
            if (user) {
                // there is already a user in db with username
                // send error
                const error = new Error('That username is not unique. Please choose another one.');
                next(error);
            } else {
                // hash password
                // insert user with hashed password
                bcrypt.hash(req.body.password, 12).then((hashed) => {
                    const newUser = {
                        username: req.body.username,
                        password: hashed
                    }

                    users.insert(newUser).then((insertedUser) => {
                        delete insertedUser.password;
                        res.json({insertedUser})
                    })
                })
            }
        })
    } else {
        // send error back to client
        next(result.error);
    }
})

module.exports = router;