const Chatbox = require('../models/chatbox.model');

const getAll = (offset, limit) => {
    return Chatbox.find()
        .skip(offset)
        .limit(limit)
        .lean();
}

const create = (data) => {
    const newChatbox = new Chatbox(data);
    return newChatbox.save();
}

const update = (id, data) => {
    return Chatbox.findByIdAndUpdate(id, data, {new: true});
}

const remove = (id, options = {}) => {
    return Chatbox.findByIdAndDelete(id, options); // /!\ À voir pour l'arg 2 'options', l'IDE n'aime pas l'id seul alors qu'il s'agit du seul arg obligatoire d'après la doc de Mongoose
}

const getUserMessages = async (userId, page, limit) => {
    const messages = await Chatbox.find({ userId })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    const totalMessages = await Chatbox.countDocuments({ userId });
    const totalPages = Math.ceil(totalMessages / limit);

    return { messages, totalPages };
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    getUserMessages
}