const pool = require('../database/pool');

const userdairy = {} 

userdairy.getAllUser = async() =>{
    let ret = {}
    ret.message = "Cannot get data"

try {
    const ret = await pool.query(`SELECT * FROM userdiary`);
    ret.message = "Sussess :)"
    console.log(ret.message);
    return ret.rows;
} catch (err) {
    ret.message = "Error"
    console.error(err.message);
}
return ret.message;
}

userdairy.getUserByID = async(id) =>{
    let ret = {}
        ret.message = "Cannot get data"

    try {
        const ret = await pool.query("SELECT * FROM userdiary WHERE user_id = $1", [id]);
        if(ret.rows.length!=0){
            ret.message ="Sussess :)"
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message =("Don't have user ID " + id);
            return ret.message;
        }
    } catch (err) {
        ret.message = "Error";
        console.error(err.message);
    }
    return ret.message;
}

userdairy.createNewUser = async(json) =>{
    let ret = {}
    ret.message = "Cannot create new account"

    try {
        const ret = await pool.query(`INSERT INTO userdiary (user_id, firstname, lastname, birthday, mobile, user_image, email, password) values ($1,$2,$3,$4,$5,$6,$7,$8)`, 
        [json.user_id, json.firstname, json.lastname, json.birthday, json.mobile, json.user_image, json.email, json.password]);
        ret.message = "Account Created :)"
        console.log(ret.message);
        return ret.message;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

userdairy.updateUserByID = async(id,json) => {
    let ret = {}
       ret.message = "Cannot update account user"
       const findByID = await pool.query(`SELECT * FROM userdiary WHERE user_id = ` + id)

       if(findByID.rows.length==0||null) {
           ret.message = "Don't have Account user ID " + id;
           return ret.message;
       } else {
           try {
               const ret = await pool.query(`UPDATE userdiary SET user_id = $1, firstname = $2, lastname = $3, birthday = $4, mobile = $5, user_image = $6, email = $7, password = $8 WHERE user_id = $9`, 
               [user_id, firstname, lastname, birthday, mobile, user_image, email, password, id]);
               ret.message = "Account Updated :)"
               console.log(ret.message);
               return ret.message;
           } catch (err) {
               ret.message = "Error"
               console.error(err.message);
           }
       }

       return ret.message;
}


module.exports = userdairy;