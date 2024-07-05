const userService = require('../services/users.services');
const chatboxService = require('../services/chatbox.services');
const {HTTP_STATUS, HTTP_MESSAGES} = require('../utils/constants');
const {sendResponse} = require('../utils/helpers');
const {comparePassword} = require('../middlewares/bcrypt/users.bcrypt');
const {generateToken, verifyToken} = require('../middlewares/jsonwebtoken/users.jsonwebtoken');

const getAllController = async (req, res) => {
    const items = await userService.getAll();

    return sendResponse({
        res,
        status: HTTP_STATUS.SUCCESS,
        message: HTTP_MESSAGES.SUCCESS,
        data: {items}
    })
}

const createController = async (req, res) => {
    const {username, password} = req.body;

    try {
        const existingUser = await userService.findByUsername(username);
        if (existingUser) {
            return sendResponse({
                res,
                status: HTTP_STATUS.BAD_REQUEST,
                message: HTTP_MESSAGES.EXISTING_USER
            })
        }

        const newUser = await userService.create({username, password});
        return sendResponse({
            res,
            status: HTTP_STATUS.CREATED,
            message: HTTP_MESSAGES.CREATED,
            data: {
                item: newUser
            }
        })
    } catch (error) {
        sendResponse({
            res,
            status: HTTP_STATUS.SERVER_ERROR,
            message: HTTP_MESSAGES.SERVER_ERROR,
        })
    }
}

const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userService.findByUsername(username);
        if (!user) {
            console.log('User not found');
            return sendResponse({
                res,
                status: HTTP_STATUS.UNAUTHORIZED,
                message: 'Invalid username or password',
            });
        }

        console.log('User found:', user);

        const isMatch = await comparePassword(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            console.log('Password does not match');
            return sendResponse({
                res,
                status: HTTP_STATUS.UNAUTHORIZED,
                message: 'Invalid username or password',
            });
        }

        const accessToken = generateToken({ userId: user._id, username: user.username }, '1h');
        const refreshToken = generateToken({ userId: user._id, username: user.username }, '30d');

        console.log('Generated access token:', accessToken);
        console.log('Generated refresh token:', refreshToken);

        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'Lax' });
        console.log('Setting refreshToken cookie');

        return res.status(200).json({
            status: 'success',
            message: HTTP_MESSAGES.SUCCESS,
            data: { accessToken }
        });
    } catch (error) {
        console.log('Error in loginController:', error);
        return res.status(500).json({
            status: 'error',
            message: HTTP_MESSAGES.SERVER_ERROR
        });
    }
}

const refreshTokenController = (req, res) => {
    const {refreshToken} = req.cookies;

    try {
        const decoded = verifyToken(refreshToken);
        const newAccessToken = generateToken({userId: decoded.userId}, '1h');

        return sendResponse({
            res,
            status: HTTP_STATUS.SUCCESS,
            message: HTTP_MESSAGES.SUCCESS,
            data: {accessToken: newAccessToken}
        })
    } catch (error) {
        sendResponse({
            res,
            status: HTTP_STATUS.UNAUTHORIZED,
            message: HTTP_MESSAGES.INVALID_TOKEN,
        })
    }
}

const updateController = async (req, res) => {
    const {id} = req.params;
    const {username, password} = req.body;

    const updateData = {};
    if (username !== undefined) updateData.username = username;
    if (password !== undefined) updateData.password = password;

    try {
        const updateItem = await userService.update(id, updateData);

        if (!updateItem) {
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
        sendResponse({
            res,
            status: HTTP_STATUS.SERVER_ERROR,
            message: HTTP_MESSAGES.SERVER_ERROR,
        })
    }
}

const deleteController = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedItem = await userService.remove(id);

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
        sendResponse({
            res,
            status: HTTP_STATUS.SERVER_ERROR,
            message: HTTP_MESSAGES.SERVER_ERROR,
        })
    }
}

const getUserByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getById(id);
        return sendResponse({
            res,
            status: HTTP_STATUS.SUCCESS,
            message: HTTP_MESSAGES.SUCCESS,
            data: user
        });
    } catch (error) {
        sendResponse({
            res,
            status: HTTP_STATUS.SERVER_ERROR,
            message: HTTP_MESSAGES.SERVER_ERROR,
        });
    }
};

const getUserMessagesController = async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 15 } = req.query;

    try {
        const { messages, totalPages } = await chatboxService.getUserMessages(id, page, limit);
        return sendResponse({
            res,
            status: HTTP_STATUS.SUCCESS,
            message: HTTP_MESSAGES.SUCCESS,
            data: { items: messages, totalPages }
        });
    } catch (error) {
        console.error('Error fetching user messages:', error);
        sendResponse({
            res,
            status: HTTP_STATUS.SERVER_ERROR,
            message: HTTP_MESSAGES.SERVER_ERROR,
        });
    }
}

module.exports = {
    getAllController,
    createController,
    updateController,
    deleteController,
    loginController,
    refreshTokenController,
    getUserByIdController,
    getUserMessagesController
}