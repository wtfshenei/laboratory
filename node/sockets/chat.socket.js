const socketIO = require('socket.io');

const initChatSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: '*'
        }

    });

    io.on('connection', (socket) => {
        console.log('New user detected');

        // Reçoit le message d'un nouvel utilisateur
        socket.on('message', (data) => {
            console.log(data);

            // Envoie la notif de message à tout le monde
            io.emit('newMessage', {
                content: data.text
            });
        })
    });
}

module.exports = {
    initChatSocket
};