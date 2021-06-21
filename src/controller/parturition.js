const pool = require(`../database/pool`);

const parturition = {}

parturition.getAllParturition = async()=>{
    let ret = {}
        ret.message = "Cannot get data!!"
    try {
        const ret = await pool.query(`SELECT * FROM parturition`);
        ret.message = "Sussess :)"
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        console.error(err.message);
    }
}

parturition.getParturitionByID = async(id) =>{
    let ret = {}
        ret.message = "Cannot get data"

    try {
        const ret = await pool.query("SELECT * FROM parturition WHERE parturition_id = $1", [id]);
        if(ret.rows.length!=0){
            ret.message ="Sussess :)"
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message =("Don't have parturition ID " + id);
            return ret.message;
        }
    } catch (err) {
        ret.message = "Error";
        console.error(err.message);
    }
    return ret.message;
}

parturition.addNewParturition = async(json) =>{
    let ret = {}
        ret.message = "Cannot create new parturition"

    try {
        const ret = await pool.query(`INSERT INTO parturition (par_date, calf_name, calf_sex, note, per_caretaker, cow_id) values ($1,$2,$3,$4,$5,$6)`, 
        [json.par_date, json.calf_name, json.calf_sex, json.note, json.per_caretaker, json.cow_id]);
        ret.message = "Parturition Created :)"
        console.log(ret.message);
        return ret.message;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

parturition.updateParturitionByID = async(id,json) => {
     let ret = {}
        ret.message = "Cannot update parturition"
        const findByID = await pool.query(`SELECT * FROM parturition WHERE parturition_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have parturition ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`UPDATE parturition SET par_date = $1, calf_name = $2, calf_sex = $3, note = $4, per_caretaker = $5, cow_id = $6 WHERE parturition_id = $7`, 
                [json.par_date, json.calf_name, json.calf_sex, json.note, json.per_caretaker, json.cow_id, id]);
                ret.message = "Parturition Updated :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;
}

parturition.deleteParturitionByID = async(id) => {
    let ret = {}
        ret.message = "Cannot Delete parturition"
        const findByID = await pool.query(`SELECT * FROM parturition WHERE parturition_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have parturition ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`DELETE FROM parturition WHERE parturition_id = $1`, [id]);
                ret.message = "Parturition Deleted :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;

}

module.exports = parturition;