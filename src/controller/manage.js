const pool = require(`../database/pool`);
const request = require("./user_request");

const manage = {}

manage.cancelRequestByUserID = async(id) => {
    let ret = {}
        ret.message = "Cannot cancel"
        const findByID = await pool.query(`SELECT * FROM user_request WHERE user_id = $1` + id)

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

manage.getRequestByFarmID = async(id) =>{
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

manage.acceptRequestByUserID = async(json) =>{
    let ret ={}
    ret.message = "Can't get data"
    const findByID = await pool.query(`SELECT * FROM user_request WHERE user_id = $1` , [json.user_id])

    if(findByID.rows.length==0||null) {
        ret.message = "Don't have request user ID " + json.user_id;
        return ret.message;
    } else {
        try {
            const ret = await pool.query(`INSERT INTO worker (role_id, farm_id, user_id, date_startwork, date_endwork) values ($1,$2,$3,$4,$5)`,
            [json.role_id, json.farm_id, json.user_id, json.date_startwork, json.date_endwork]);
            ret.message = "Add to farm :)"
            console.log(ret.message);

            const check = await pool.query(`SELECT * FROM worker WHERE user_id = $1 AND farm_id = $2` , [json.user_id, json.farm_id])
            console.log(check)
            if(check.rows.length >= 1){
                const result = await request.cancelRequestByUserID(json.user_id);
                result.message = "Request Deleted :)"
                console.log(result.message);
        
            }
            
            return ret.message

        } catch (err) {
            ret.message = "Error"
            console.error(err.message);
        }

    }

    return ret.message

}

manage.getRequestByUserID = async(id) =>{
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

module.exports = manage;