const pool = require(`../database/pool`);

const abdominal = {}

abdominal.getAllabdominal = async()=>{
    let ret = {}
        ret.message = "Cannot get data!!"
    try {
        const ret = await pool.query(`SELECT * FROM abdominal`);
        ret.message = "Sussess :)"
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = abdominal;