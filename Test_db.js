const Pool = require('pg').Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "root1234",
    database: "DairyCattle",
    port: 5432
});

pool.connect();
pool.query(`SELECT * FROM cow`, (err, result) => {
    if(!err) {
        console.log(result.rows)
    }
    pool.end();
})