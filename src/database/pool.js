const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "root1234",
    database: "DairyCattle",
    port: 5432
});

pool.on("connect", ()=> {
    console.log("Database connection");
})

pool.on("end", ()=> {
    console.log("Connection end");
})

module.exports = pool;