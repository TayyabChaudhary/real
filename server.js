const express = require('express');

const server = express();

const port = 4569;

const bodyParser = require('body-parser');

const cors = require('cors');

// -------------------- Env File Configure -----------------
require('dotenv').config();

// ----------------------- Import All Middlewares -----------------------------
server.use(express.json());
server.use(bodyParser.json({ limit: '50mb' }))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
server.use(cors());


// ------------------ Import All Controllers ------------------------

const adminController = require('./controllers/admin');

// --------------- Import Controller Routes -----------

server.get('/', (req, res) => {
    res.send('Hello World!')
});

server.use(adminController);



server.listen(port, () => console.log(`Server app listening on port http://localhost:${port}`))