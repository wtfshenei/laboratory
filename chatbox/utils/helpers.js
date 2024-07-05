const {HTTP_STATUS, HTTP_MESSAGES} = require('./constants');

const sendResponse = ({
        res,
        status = HTTP_STATUS.SUCCESS,
        message = HTTP_MESSAGES.SUCCESS,
        data = {}
    }) => {
    let response = {status, message, data};

    if (Object.keys(data).length === 0) delete response.data
    return res.status(status).json(response);
}

module.exports = {
    sendResponse
}