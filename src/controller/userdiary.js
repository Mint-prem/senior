const pool = require('../database/pool');

exports.getAllUser = async (req, res) => {

    try {
        message = "Cannot get data"

        const getAll = await pool.query(`SELECT * FROM users`);
        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { rows: getAll.rows } })
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

exports.getUserByID = async (req, res) => {

    try {

        if (req.body.user_id == undefined || req.body.user_id.length == 0) {
            message = "User ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const user_id = req.body.user_id

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        message = "Cannot get data"
        const getUser = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        if (getUser.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: getUser.rows } })
        } else {
            message = ("Don't have user ID " + user_id);
            return res.status(500).send({ data: { message: message } });
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

exports.updateUserByID = async (req, res) => {

    try {
        message = "Cannot update account user"

        if (req.body.user_id == undefined || req.body.user_id.length == 0 || null) {
            message = "User ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const user_id = req.body.user_id
        let firstname = req. body.firstname
        let lastname = req.body.lastname
        let user_birthday = req.body.user_birthday
        let mobile = req.body.mobile
        let user_image = req.body.user_image

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const editUser = await pool.query(`UPDATE users SET firstname = $1, lastname = $2, user_birthday = $3, mobile = $4, user_image = $5 WHERE user_id = $6`,
            [firstname, lastname, user_birthday, mobile, user_image, user_id]);

        const checkUpdate = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        message = "Account Updated :)"

        console.log(message);
        return res.status(200).send({ data: { message: message, rows: checkUpdate.rows} })
        
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}