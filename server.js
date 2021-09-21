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
require('./src/routes/cow')(app);
require('./src/routes/typecow')(app);
require('./src/routes/species')(app);
require('./src/routes/vaccine')(app);
require('./src/routes/worker')(app);
require('./src/routes/abdominal')(app);
require('./src/routes/statuscow')(app);
require('./src/routes/parturition')(app);
require('./src/routes/role')(app);





require("dotenv").config();

app.get('/', (req, res) =>{
    console.log(res)
    res.send('Welcome to My Project')

}) 

pool.connect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

module.exports = app