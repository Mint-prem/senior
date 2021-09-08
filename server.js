const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000
const pool = require(`./src/database/pool`);

var corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(require('./src/routes/index.js'));
require('./src/routes/auth')(app);
require('./src/routes/user')(app);
require('./src/routes/farm')(app);
require("dotenv").config();

app.get('/', (req, res) => res.send('Welcome to My Project'))

pool.connect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

module.exports = app