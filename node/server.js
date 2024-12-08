const logger = require('./utils/logger');
const express = require("express");
const database = require("./config/mongodb.config");
const http = require("http");
const app = express();
const cors = require('cors');
const chat = require('./sockets/chat.socket');
const PORT = 3000;

database.connect();

app.use(cors());

const server = http.createServer(app);
chat.initChatSocket(server);

// app.use(express.json());
//
// app.get("/", (req, res) => {
//     logger.error('Coucou les gens');
//     res.send("Silence is golden");
// })
//
// app.use('/things', require('./routes/things.routes'));

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})