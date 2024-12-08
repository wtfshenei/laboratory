const mongoose = require('mongoose');
const {DATABASE} = require('../utils/constants');

/*
 * Adds event listeners to the Mongoose connection to monitor various states of the database connection.
 */
const addEventListener = () => {
    mongoose.connection.on('connecting', () => {
        console.log(DATABASE.CONNECTING);
    })
    mongoose.connection.on('connected', () => {
        console.log(DATABASE.CONNECTED);
    })
    mongoose.connection.on('disconnecting', () => {
        console.log(DATABASE.DISCONNECTING);
    })
    mongoose.connection.on('disconnected', () => {
        console.log(DATABASE.DISCONNECTED);
    })
    mongoose.connection.on('close', () => {
        console.log(DATABASE.CLOSE);
    })
    mongoose.connection.on('reconnected', () => {
        console.log(DATABASE.RECONNECTED);
    })
    mongoose.connection.on('error', () => {
        console.log(DATABASE.ERROR);
    })
}

const connect = () => {
    const databaseURL = "mongodb://localhost:27017/demo_ludo";

    try {

        if(mongoose.connection.readyState === mongoose.Connection.STATES.connecting || mongoose.connection.readyState === mongoose.Connection.STATES.connected) {
            return;
        }

        addEventListener();

        mongoose.connect(databaseURL);
    } catch (error) {
        console.log(error);
    }
}

const disconnect = () => {

}

module.exports = {
    connect,
    disconnect
}