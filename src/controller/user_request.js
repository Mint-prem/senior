const pool = require(`../database/pool`);

exports.getRequestByUserID = async (req, res) => {

    try {
        const user_id = req.body.user_id;
        message = "Can't get data"

        if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const getRequest = await pool.query("SELECT * FROM join_farm WHERE user_id = $1", [user_id]);
        if (getRequest.rows.length != 0) {
            message = "Sussess :)"
            console.log(rows);
            console.log(message);
            return res.status(200).send({ data: { ment: 1, rows: getRequest.rows } })
        } else {
            message = ("Don't have any request by user ID " + user_id);
            console.log(message)
            return res.status(200).send({ data: { ment: 2, message: message } })
        }
    } catch (err) {
        message = "error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.addNewRequest = async (req, res) => {

    try {
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id


        if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])


        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const userHaveFarm = await pool.query(`SELECT * FROM workers WHERE user_id = $1`, [user_id])
        if (userHaveFarm.rows.length != 0) {
            message = "User already have farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const findRequest = await pool.query(`SELECT * FROM join_farm WHERE user_id = $1`, [user_id])
        if (findRequest.rows.length != 0) {
            message = "Can't create new request because you already request another farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })

        } else {
            const createReq = await pool.query(`INSERT INTO join_farm (user_id,farm_id) values ($1,$2)`, [user_id, farm_id]);

            const checkCreate = await pool.query(`SELECT * FROM join_farm WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])

            if (checkCreate.rows.length == 1) {
                message = "Request Created :)"
                console.log(message);
                return res.status(200).send({ data: { message: message, rows: checkCreate.rows } })
            }
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.cancelRequestByUserID = async (req, res) => {

    try {
        const user_id = req.body.user_id

        if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const findByID = await pool.query(`SELECT * FROM join_farm WHERE user_id = ` + user_id)

        if (findByID.rows.length == 0 || null) {
            message = "Don't have any request by user ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const cancelReq = await pool.query(`DELETE FROM join_farm WHERE user_id = $1`, [user_id]);
        message = "Request Deleted :)"
        console.log(message);
        return res.status(200).send({ data: { message: message } })
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })

}