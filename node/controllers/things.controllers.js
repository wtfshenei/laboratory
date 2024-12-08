const thingsService = require('../services/things.services');
const {HTTP_STATUS, HTTP_MESSAGES} = require('../utils/constants');
const {sendResponse} = require('../utils/helpers');

const getAllController = async (req, res) => {

    const items = await thingsService.getAll();

    return sendResponse({
        res,
        status: HTTP_STATUS.CREATED,
        message: HTTP_MESSAGES.SUCCESS,
        data: {items}
    })
}

const createController = async (req, res) => {

    const {title, description} = req.body;

    try {
        const newItem = await thingsService.create({title, description});
        return sendResponse({
            res,
            status: HTTP_STATUS.CREATED,
            message: HTTP_MESSAGES.SUCCESS,
            data: {
                item: newItem
            }
        })
    } catch(error) {
        return sendResponse({
            res,
            status: HTTP_STATUS.SERVER_ERROR,
            message: HTTP_MESSAGES.SERVER_ERROR,
        })
    }
}

const updateController = (req, res) => {
    res.status(200).json({
        message: "Youpi"
    })
}

module.exports = {
    getAllController,
    createController,
    updateController
}