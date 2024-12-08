require('dotenv').config();

const express = require("express");
const database = require("./config/mongodb.config");
const http = require("http");
const app = express();
const cors = require('cors');
const chat = require('./sockets/chat.socket');
const cookieParser = require('cookie-parser'); // Cookie-parser pour parser les cookies
const PORT = 3000;

database.connect();

const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // Utilisation de cookie-parser

const server = http.createServer(app);
chat.initChatSocket(server);

app.use('/chatbox', require('./routes/chatbox.routes'));
app.use('/users', require('./routes/users.routes'));

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
