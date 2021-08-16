const pool = require(`../database/pool`);

const request = {}

request.getAllRequest = async()=>{
    let ret = {}
        ret.message = "Cannot get data!!"
    try {
        const ret = await pool.query(`SELECT * FROM user_request`);
        ret.message = "Sussess :)"
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        console.error(err.message);
    }
}

request.getRequestByFarmID = async(id) =>{
    let ret = {}
    ret.message = "Can't get data"

    try {
        const ret = await pool.query("SELECT * FROM user_request WHERE farm_id = $1", [id]);
        if(ret.rows.length!=0){
            ret.message ="Sussess :)"
            console.log(ret.rows);
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message =("Don't have farm ID " + id);
            return ret.message;
        }
    } catch (err) {
        console.error(err.message);
    }
    return ret.message;
}

request.getRequestByUserID = async(id) =>{
    let ret = {}
    ret.message = "Can't get data"

    try {
        const ret = await pool.query("SELECT * FROM user_request WHERE user_id = $1", [id]);
        if(ret.rows.length!=0){
            ret.message ="Sussess :)"
            console.log(ret.rows);
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message =("Don't have user ID " + id);
            return ret.message;
        }
    } catch (err) {
        console.error(err.message);
    }
    return ret.message;
}

request.addNewRequest = async(json) =>{
    let ret = {}
        ret.message = "Cannot create new request"

    try {
        const ret = await pool.query(`INSERT INTO user_request (user_id,farm_id) values ($1,$2)`, 
        [json.user_id, json.farm_id]);
        ret.message = "Request Created :)"
        console.log(ret.message);
        return ret.message;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

request.cancelRequestByUserID = async(id) => {
    let ret = {}
        ret.message = "Cannot cancel"
        const findByID = await pool.query(`SELECT * FROM user_request WHERE user_id = ` + id)

        if(findByID.rows.length==0||null) {
            ret.message = "Don't have user ID " + id;
            return ret.message;
        } else {
            try {
                const ret = await pool.query(`DELETE FROM user_request WHERE user_id = $1`, [id]);
                ret.message = "Request Deleted :)"
                console.log(ret.message);
                return ret.message;
            } catch (err) {
                ret.message = "Error"
                console.error(err.message);
            }
        }

        return ret.message;

}

module.exports = request;