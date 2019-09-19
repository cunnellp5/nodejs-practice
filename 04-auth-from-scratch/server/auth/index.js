const express = require('express');

const router = express.Router();

// any route in here is pre-pended with /auth

router.get('/', (req, res) => {
    res.json({
        message: 'Auth router working!'
    })
})

router.post('/signup', (req, res) => {
    console.log(req.body)
    res.json({
        message: 'Posted to signup!'
    })
})

module.exports = router;