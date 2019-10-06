const jwt = require('jsonwebtoken');

function checkTokenSetUser(req, res, next) {
    const authHeader = req.get('Authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            // use jwt lib to decode
            jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
                if (error) {
                    console.log(error)
                }
                req.user = user;
                next();
            });
        } else {
            next();
        }
    } else {
        next();
    }
}

module.exports = {
    checkTokenSetUser
}