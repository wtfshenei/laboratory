const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    console.log('Comparing passwords:', { password, hashedPassword, match });
    return match;
};

module.exports = {
    hashPassword,
    comparePassword
};