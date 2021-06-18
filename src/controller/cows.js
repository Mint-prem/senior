const pool = require('../database/pool');

const cows = {}     

cows.getAllCow = async()=>{
    let ret = {}
        ret.message = "Can't get data"

    try {
        const ret = await pool.query(`SELECT * FROM cow`);
        ret.message = "Sussess :)"
        console.log(ret.rows);
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        console.error(err.message);
    }
    return ret.message;
}

cows.getCow = async(id) =>{
    let ret = {}
        ret.message = "Can't get data"

    try {
        const ret = await pool.query("SELECT * FROM cow WHERE cow_id = $1", [id]);
        if(ret.rows.length!=0){
            ret.message ="Sussess :)"
            console.log(ret.rows);
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message =("Don't have cow ID " + id);
            return ret.message;
        }
    } catch (err) {
        console.error(err.message);
    }
    return ret.message;
}

cows.addCow = async(json) =>{
    let ret = {}
        ret.message = "Cannot create new cow"

    try {
        const newCow = await pool.query(`INSERT INTO cow (cow_no, cow_name, cow_birthday, cow_sex, cow_image1, cow_image2, cow_image3, note, typecow_id, species_id, farm_id, statuscow_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`, 
        [json.cow_no, json.cow_name, json.cow_birthday, json.cow_sex, json.cow_image1, json.cow_image2, json.cow_image3, json.note, json.typecow_id, json.species_id, json.farm_id, json.statuscow_id]);
        ret.message = "Cow Created :)"
        console.log(ret.rows);
        console.log(ret.message);
        return ret.message;
    } catch (err) {
        console.error(err.message);
    }
    return ret.message;
 }

module.exports = cows;