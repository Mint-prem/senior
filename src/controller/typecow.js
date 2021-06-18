const pool = require(`../database/pool`);

const typecow = {}

typecow.getAllTypecow = async()=>{
    let ret = {}
        ret.message = "Cannot get data!!"
    try {
        const ret = await pool.query(`SELECT * FROM typecow`);
        ret.message = "Sussess :)"
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        console.error(err.message);
    }
}

typecow.getTypecowByID = async(id) =>{
    let ret = {}
    ret.message = "Can't get data"

    try {
        const ret = await pool.query("SELECT * FROM typecow WHERE typecow_id = $1", [id]);
        if(ret.rows.length!=0){
            ret.message ="Sussess :)"
            console.log(ret.rows);
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message =("Don't have typecow ID " + id);
            return ret.message;
        }
    } catch (err) {
        console.error(err.message);
    }
    return ret.message;
}

module.exports = typecow;