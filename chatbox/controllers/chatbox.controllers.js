const chatboxService = require('../services/chatbox.services');
const {HTTP_STATUS, HTTP_MESSAGES} = require('../utils/constants');
const {sendResponse} = require('../utils/helpers');

const getAllController = async (req, res) => {
    const { offset, limit } = req.query; // Accepter les paramètres depuis la requête

    try {
        const items = await chatboxService.getAll(parseInt(offset), parseInt(limit));

        return res.status(200).json({
            status: 'success',
            message: HTTP_MESSAGES.SUCCESS,
            data: { items }
        });
    } catch (error) {
        console.error('Error in getAllController:', error);
        return res.status(500).json({
            status: 'error',
            message: HTTP_MESSAGES.SERVER_ERROR
        });
    }
}

const createController = async (req, res) => {
    const { text, userId, username } = req.body;

    try {
        const newItem = await chatboxService.create({ text, userId, username });
        return res.status(201).json({
            status: 'success',
            message: HTTP_MESSAGES.CREATED,
            data: {
                item: newItem
            }
        });
    } catch (error) {
        console.error('Error in createController:', error);
        return res.status(500).json({
            status: 'error',
            message: HTTP_MESSAGES.SERVER_ERROR
        });
    }
}

const updateController = async (req, res) => {
    const {id} = req.params;
    const {text} = req.body;

    const updateData = {};
    if (text !== undefined) updateData.text = text;

    try {
        const updateItem = await chatboxService.update(id, updateData);

        if (!updateData) {
            return sendResponse({
                res,
                status: HTTP_STATUS.NOT_FOUND,
                message: HTTP_MESSAGES.NOT_FOUND
            })
        }

        return sendResponse({
            res,
            status: HTTP_STATUS.SUCCESS,
            message: HTTP_MESSAGES.SUCCESS,
            data: {
                item: updateItem
            }
        })
    } catch (error) {
        return sendResponse({
            res,
            status: HTTP_STATUS.SERVER_ERROR,
            message: HTTP_MESSAGES.SERVER_ERROR
        })
    }
}

const deleteController = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedItem = await chatboxService.remove(id);

        if (!deletedItem) {
            return sendResponse({
                res,
                status: HTTP_STATUS.NOT_FOUND,
                message: HTTP_MESSAGES.NOT_FOUND
            })
        }

        return sendResponse({
            res,
            status: HTTP_STATUS.SUCCESS,
            message: HTTP_MESSAGES.SUCCESS,
            data: {
                item: deletedItem
            }
        })
    } catch (error) {
        return sendResponse({
            res,
            status: HTTP_STATUS.SERVER_ERROR,
            message: HTTP_MESSAGES.SERVER_ERROR
        })
    }
}

module.exports = {
    getAllController,
    createController,
    updateController,
    deleteController
}