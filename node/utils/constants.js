module.exports = {
    HTTP_STATUS: {
        SUCCESS: 200,
        CREATED: 201,
        NOT_FOUND: 404,
        SERVER_ERROR: 500
    },
    HTTP_MESSAGES: {
        SUCCESS: 'Success',
        NOT_FOUND: 'Item not found',
        CREATED: 'Item created successfully',
        SERVER_ERROR: 'Server error'
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