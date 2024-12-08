const winston = require("winston");
const {combine, printf, errors} = winston.format;

const customFormat = printf(({
                                message
                             }) => {

    const date = new Date();
    const timestamp = `${date.getDate()}/${date.getMonth() +1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

    return `${timestamp} - ${message}`;
})

const options = {
    console: {
        handleExceptions: true,
        format: combine(
            winston.format.colorize(),
            customFormat
        )
    },
    file: {
        level: 'error',
        filename: './logs/debug.log',
        handleExceptions: true,
        format: combine(
                customFormat,
                errors({stack: true} //Afficher la stack trace
            )),
        maxsize: 5864202, //5MB
        maxFiles: 5
    }
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.file),
    ],
    exitOnError: false,
})

module.exports = logger;