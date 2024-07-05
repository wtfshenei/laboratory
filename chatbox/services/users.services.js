const User = require('../models/users.model');
const {hashPassword} = require('../middlewares/bcrypt/users.bcrypt');

const getAll = () => {
    return User.find().lean();
}

const getById = (id) => {
    return User.findById(id).lean();
}

const create = async (data) => {
    const hashedPassword = await hashPassword(data.password);
    console.log('Hashed password:', hashedPassword);
    const newUser = new User({ ...data, password: hashedPassword });
    return newUser.save();
}

const update = async (id, data) => {
    if (data.password) {
        data.password = await hashPassword(data.password);
    }
    return User.findByIdAndUpdate(id, data, {new: true});
}

const remove = (id, options = {}) => {
    return User.findByIdAndDelete(id, options);
}

const findByUsername = (username) => {
    return User.findOne({username}).lean()
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    findByUsername,
    getById
}