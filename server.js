const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const pool = require(`./src/database/pool`);

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./src/routes/index.js'));

app.get('/',(req, res) => res.send('Welcome to My Project'))

pool.connect();

app.listen(3000,() => {
    console.log(`Server is running on port 3000`)
});

module.exports = app