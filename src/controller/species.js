const pool = require(`../database/pool`);

const species = {}

species.getAllSpecies=async()=>{
    let ret = {}
        ret.message = "Cannot get data!!"
    try {
        const ret = await pool.query(`SELECT * FROM species`);
        ret.message = "Sussess :)"
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }

    return ret.message;
}

species.getSpeciesByID = async(id) =>{
    let ret = {}
    ret.message = "Can't get data"

    try {
        const ret = await pool.query("SELECT * FROM species WHERE species_id = $1", [id]);
        if(ret.rows.length!=0){
            ret.message ="Sussess :)"
            console.log(ret.rows);
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message =("Don't have species ID " + id);
            return ret.message;
        }
    } catch (err) {
        console.error(err.message);
    }
    return ret.message;
}

module.exports = species;