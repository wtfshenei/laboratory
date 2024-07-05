const socketIO = require('socket.io');
const { createController } = require('../controllers/chatbox.controllers');

const users = new Map();

const initChatSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        console.log('New user detected');

        // Gérer la connexion d'un utilisateur
        socket.on('register', (data) => {
            users.set(socket.id, { userId: data.userId, username: data.username });
            io.emit('userList', Array.from(users.values()));
        });

        // Gérer la déconnexion d'un utilisateur
        socket.on('disconnect', () => {
            users.delete(socket.id);
            io.emit('userList', Array.from(users.values()));
        });

        // Reçoit le message d'un nouvel utilisateur
        socket.on('message', async (data) => {
            console.log('Received message:', data);

            // Fake request and response objects
            const req = {
                body: { text: data.text, userId: data.userId, username: data.username }
            };

            const res = {
                status: (statusCode) => ({
                    json: (responseBody) => {
                        if (statusCode === 201) {
                            // Diffuser le nouveau message à tous les clients connectés
                            io.emit('newMessage', responseBody.data.item);
                        } else {
                            console.error('Error:', responseBody.message);
                        }
                    }
                })
            };

            // Utiliser le contrôleur pour créer un nouveau message
            await createController(req, res);
        });
    });
}

module.exports = {
    initChatSocket
};