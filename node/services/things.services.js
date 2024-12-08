const Thing = require("../models/things.model");
const getAll = () => {
    return Thing.find();
}

const create = (data) => {
    const newItem = new Thing(data);
    return newItem.save();
}

module.exports = {
    getAll,
    create
}