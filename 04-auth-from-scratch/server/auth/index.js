const express = require('express');
const Joi = require('@hapi/joi');

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

router.post('/signup', (req, res) => {
    console.log(req.body)
    const result = schema.validate(req.body)
    res.json(result)
})

module.exports = router;