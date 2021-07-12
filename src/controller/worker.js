const pool = require(`../database/pool`);

const worker = {}

worker.getAllWorker = async()=>{
    let ret = {}
        ret.message = "Cannot get data"

    try {
        const ret = await pool.query(`SELECT * FROM worker`);
        ret.message = "Sussess :)"
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

worker.getWorkerByID = async(id) =>{
    let ret = {}
        ret.message = "Cannot get data"

    try {
        const ret = await pool.query("SELECT * FROM worker WHERE worker_id = $1", [id]);
        if(ret.rows.length!=0){
            ret.message ="Sussess :)"
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message =("Don't have worker ID " + id);
            return ret.message;
        }
    } catch (err) {
        ret.message = "Error";
        console.error(err.message);
    }
    return ret.message;
}

worker.addNewWorker = async(json) =>{
    let ret = {}
        ret.message = "Cannot create new worker"

    try {
        const ret = await pool.query(`INSERT INTO worker (role_id, farm_id, user_id, date_startwork, date_endwork) values ($1,$2,$3,$4,$5)`, 
        [json.role_id, json.farm_id, json.user_id, json.date_startwork, json.date_endwork]);
        ret.message = "Worker Add :)"
        console.log(ret.message);
        return ret.message;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

worker.updateWorkerByID = async(id,json) => {
     let ret = {}
        ret.message = "Cannot update worker"
        const findByID = await pool.query(`SELECT * FROM worker WHERE worker_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have worker ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`UPDATE worker SET role_id = $1, farm_id = $2, user_id = $3, date_startwork = $4, date_endwork = $5 WHERE cow_id = $6`, 
                [json.role_id, json.farm_id, json.user_id, json.date_startwork, json.date_endwork, id]);
                ret.message = "Worker Updated :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;
}

worker.deleteWorkerByID = async(id) => {
    let ret = {}
        ret.message = "Cannot Delete worker"
        const findByID = await pool.query(`SELECT * FROM worker WHERE worker_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have worker ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`DELETE FROM worker WHERE worker_id = $1`, [id]);
                ret.message = "Worker Deleted :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;

}

module.exports = worker;