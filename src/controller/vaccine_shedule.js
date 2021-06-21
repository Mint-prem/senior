const pool = require(`../database/pool`);

const schedule = {}

schedule.getAllSchedule =async()=>{
    let ret = {}
        ret.message = "Cannot get data!!"
    try {
        const ret = await pool.query(`SELECT * FROM vaccine_schedule`);
        ret.message = "Sussess :)"
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        console.error(err.message);
    }
}

schedule.getScheduleByID = async(id) =>{
    let ret = {}
        ret.message = "Cannot get data"

    try {
        const ret = await pool.query("SELECT * FROM vaccine_schedule WHERE schedule_id = $1", [id]);
        if(ret.rows.length!=0){
            ret.message ="Sussess :)"
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message =("Don't have schedule ID " + id);
            return ret.message;
        }
    } catch (err) {
        ret.message = "Error";
        console.error(err.message);
    }
    return ret.message;
}

schedule.addNewSchedule = async(json) =>{
    let ret = {}
        ret.message = "Cannot create new schedule"

    try {
        const ret = await pool.query(`INSERT INTO vaccine_schedule (vac_date, next_date, note, vaccine_id, cow_id) values ($1,$2,$3,$4,$5)`, 
        [json.vac_date, json.next_date, json.note, json.vaccine_id, json.cow_id]);
        ret.message = "Schedule Created :)"
        console.log(ret.message);
        return ret.message;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

schedule.updateScheduleByID = async(id,json) => {
     let ret = {}
        ret.message = "Cannot update schedule"
        const findByID = await pool.query(`SELECT * FROM vaccine_schedule WHERE schedule_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have schedule ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`UPDATE vaccine_schedule SET vac_date = $1, next_date = $2, note = $3, vaccine_id = $4, cow_id = $5 WHERE schedule_id = $6`, 
                [json.vac_date, json.next_date, json.note, json.vaccine_id, json.cow_id, id]);
                ret.message = "Schedule Updated :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;
}

schedule.deleteScheduleByID = async(id) => {
    let ret = {}
        ret.message = "Cannot Delete schedule"
        const findByID = await pool.query(`SELECT * FROM vaccine_schedule WHERE schedule_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have schedule ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`DELETE FROM vaccine_schedule WHERE schedule_id = $1`, [id]);
                ret.message = "Schedule Deleted :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;

}

module.exports = schedule;