const jwt = require('jsonwebtoken');

const generateToken = (payload, expiresIn) => {
    const secret = process.env.JWT_SECRET;
    console.log('Generating token with payload:', payload);
    const options = { expiresIn };
    return jwt.sign(payload, secret, options);
};

const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    return jwt.verify(token, secret);
};

module.exports = {
    generateToken,
    verifyToken
};