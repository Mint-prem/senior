const pool = require(`../database/pool`);

const vaccine_shedule = {}

vaccine_shedule.getAllVaccineShedule =async()=>{
    let ret = {}
        ret.message = "Cannot get data!!"
    try {
        const result = await pool.query(`SELECT * FROM vaccine_shedule`);
        ret.message = "Sussess :)"
        console.log(result);
        console.log(ret.message);
        return result;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = vaccine_shedule;