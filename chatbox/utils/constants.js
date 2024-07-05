module.exports = {
    HTTP_STATUS: {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        SERVER_ERROR: 500
    },
    HTTP_MESSAGES: {
        SUCCESS: 'Success',
        CREATED: 'Created',
        BAD_REQUEST: 'Bad Request',
        UNAUTHORIZED: 'Unauthorized',
        FORBIDDEN: 'Forbidden',
        NOT_FOUND: 'Not Found',
        SERVER_ERROR: 'Internal Server Error',
        EXISTING_USER: 'User already exists',
        INVALID_LOGIN_INFORMATION: 'Invalid username or password',
        INVALID_TOKEN: 'Invalid token'
    },
    DATABASE: {
        CONNECTING: 'DB connection is connecting',
        CONNECTED: 'DB connection is connected',
        DISCONNECTING: 'DB connection is disconnecting',
        DISCONNECTED: 'DB connection is disconnected',
        RECONNECTED: 'DB connection is reconnected',
        CLOSE: 'DB connection is closed',
        ERROR: 'DB connectivity error',
    }
}