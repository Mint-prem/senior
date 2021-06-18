const pool = require('../database/pool');

const cows = {}     

cows.getAllCow=async()=>{
    let ret = {}
        ret.message = "Cannot get Cows!!"
    try {
        const result = await pool.query(`SELECT * FROM cow`);
        ret.message = "Sussess :)"
        console.log(result);
        console.log(ret.message);
        return result;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = cows;