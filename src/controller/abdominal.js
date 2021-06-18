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

abdominal.getAbdominalByID = async(id) =>{
    let ret = {}
        ret.message = "Can't get data"

    try {
        const ret = await pool.query("SELECT * FROM abdominal WHERE abdominal_id = $1", [id]);
        if(ret.rows.length!=0){
            ret.message ="Sussess :)"
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message =("Don't have abdominal ID " + id);
            return ret.message;
        }
    } catch (err) {
        console.error(err.message);
    }
    return ret.message;
}

abdominal.addNewAbdominal = async(json) =>{
    let ret = {}
        ret.message = "Cannot create new abdominal"

    try {
        const ret = await pool.query(`INSERT INTO abdominal (round, ab_date, status, staff, dry_period, semen, note, cow_id, parturition_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, 
        [round, ab_date, status, staff, dry_period, semen, note, cow_id, parturition_id]);
        ret.message = "Abdominal Created :)"
        console.log(ret.message);
        return ret.message;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
 }

abdominal.updateAbdominalByID = async(id,json) => {
    let ret = {}
       ret.message = "Cannot update abdominal"
       const findCow = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = ` + id)

       if(findCow.rows.length==0||null) {
           ret.message = "Don't have abdominal ID " + id;
           return ret.message;
       } else {
           try {
               const ret = await pool.query(`UPDATE abdominal SET round = $1, ab_date = $2, status = $3, staff = $4, dry_period = $5, semen = $6, note = $7, cow_id = $8, parturition_id = $9 WHERE abdominal_id = $10`, 
               [round, ab_date, status, staff, dry_period, semen, note, cow_id, parturition_id, id]);
               ret.message = "Abdominal Updated :)"
               console.log(ret.message);
               return ret.message;
           } catch (err) {
               ret.message = "Error"
               console.error(err.message);
           }
       }

       return ret.message;
}

abdominal.deleteAbdominalByID = async(id) => {
    let ret = {}
        ret.message = "Cannot Delete Abdominal"
        const findAbdominal = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = ` + id)

        if(findAbdominal.rows.length==0||null) {
            ret.message = "Don't have Abdominal ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`DELETE FROM abdominal WHERE abdominal_id = $1`, [id]);
                ret.message = "Abdominal Deleted :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;
        
}

module.exports = abdominal;