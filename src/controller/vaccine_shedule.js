const pool = require(`../database/pool`);

const vaccine_shedule = {}

vaccine_shedule.getAllVaccineShedule =async()=>{
    let ret = {}
        ret.message = "Cannot get data!!"
    try {
        const ret = await pool.query(`SELECT * FROM vaccine_shedule`);
        ret.message = "Sussess :)"
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = vaccine_shedule;