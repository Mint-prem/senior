const pool = require(`../database/pool`);

const abdominal = {}

abdominal.getAllabdominal = async()=>{
    let ret = {}
        ret.message = "Cannot get data!!"
    try {
        const result = await pool.query(`SELECT * FROM abdominal`);
        ret.message = "Sussess :)"
        console.log(result);
        console.log(ret.message);
        return result;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = abdominal;