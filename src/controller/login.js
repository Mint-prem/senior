const { request } = require('../../server');
const pool = require('../database/pool')

const login = {}

login.authen = async(json) => {

    var email = json.email;
    var password = json.password;

    let ret = {}
        ret.message = "Cannot Login"

        try {
            const account = await pool.query(`SELECT * FROM userdiary WHERE email = $1`,[email])

            if(account.rows.length == 0||null){
                ret.message = "Account not found!!"
            } else {
                if(password != account.rows[0].password) {
                    ret.message = "Wrong Password"
                } else if (password == account.rows[0].password){
                    ret.message = "Logged in :)"
                }
            }

        } catch (err) {
            ret.message = "Error"
            console.error(err)
        }

        return ret.message;

}

module.exports = login;