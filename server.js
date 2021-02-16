require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io',{ rememberTransport: false })(server);
const port = process.env.PORT || 5000;
const cors = require('cors');
const router = require('./routes')(io);
app.use(cors());

app.use(express.json());

app.use('/', router);

server.listen(port, () => console.log(`Server is running at http://localhost:${port}`));