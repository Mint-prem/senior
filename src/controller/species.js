const pool = require(`../database/pool`);

const species = {}

species.getAllSpecies=async()=>{
    let ret = {}
        ret.message = "Cannot get species"
    try {
        const result = await pool.query(`SELECT * FROM species`);
        ret.message = "Sussess :)"
        console.log(result);
        console.log(ret.message);
        return result;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = species;