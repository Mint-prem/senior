const pool = require(`../database/pool`);

exports.getAllRequest = async (req, res) => {

    try {
        message = "Cannot get data!!"
        const getAll = await pool.query(`SELECT * FROM join_farm j join users u on u.user_id = j.user_id`);

        if (getAll.rows.length == 0) {
            message = "Don't have any request"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else {
            message = "Sussess :)"
            console.log(message);
            console.log("Have " + getAll.rows.length + " request")
            return res.status(200).send({ data: { rows: getAll.rows } })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getRequestByFarmID = async (req, res) => {

    try {
        const user_id = req.body.user_id
        const farm_id = req.body.farm_id

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
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])


        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            if (checkMember.rows[0].role_id == 1) {
                const getRequest = await pool.query("SELECT * FROM join_farm j INNER JOIN users u ON j.user_id = u.user_id WHERE j.farm_id = $1", [farm_id]);

                if(getRequest.rows.length > 0){
                    message = "Success :)"
                    console.log(message)
                    return res.status(200).send({ data: { rows: getRequest.rows } })
                } else {
                    message = "Don't have any request"
                    console.log(message)
                    return res.status(200).send({ data: { message: message } })
                }

            } else {
                message = "You don't have permission!!"
                console.log(message)
                return res.status(500).send({ data: { message: message } })
            }
        } else {
            message = "You are not a member in this farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.acceptRequestByUserID = async (req, res) => {

    try {
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id
        const join_id = req.body.join_id
        message = "Method Error"

        if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (join_id.length == 0 || null) {
            message = "Please Fill Join ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])
        const findRequestByID = await pool.query(`SELECT * FROM join_farm WHERE join_id = $1 AND farm_id = $2`, [join_id, farm_id])

        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findRequestByID.rows.length == 0 || null) {
            message = "Don't have Request ID " + join_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })

        } else if (checkMember.rows.length != 0) {

            if (checkMember.rows[0].role_id == 1) {

                if (findRequestByID.rows.length == 1) {
                    const j_user_id = findRequestByID.rows[0].user_id

                    const declineReq = await pool.query(`DELETE FROM join_farm WHERE join_id = $1`, [join_id]);
                    message = "Request Deleted"
                    console.log(message);

                    const date = new Date();
                    var startwork = date.toISOString();

                    const addWorker = await pool.query(`INSERT INTO workers (role_id, farm_id, user_id, startwork) values (2,$1,$2,$3)`,
                        [farm_id, j_user_id, startwork]);

                    const checkWorker = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [j_user_id, farm_id])
                    message += " and Add to farm :) ";
                    console.log(message);
                    return res.status(200).send({ data: { message: message, rows: checkWorker.rows } })
                }

            } else {
                message = "You don't have permission!!"
                console.log(message)
                return res.status(500).send({ data: { message: message } })
            }

        } else {
            message = "You are not a member in this farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    return res.status(500).send({ data: { message: message } })
}

exports.deleteRequestByUserID = async (req, res) => {

    try {
        const user_id = req.body.user_id
        const farm_id = req.body.farm_id
        const join_id = req.body.join_id

        if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (join_id.length == 0 || null) {
            message = "Please Fill Join ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const findRequestByID = await pool.query(`SELECT * FROM join_farm WHERE join_id = $1 AND farm_id = $2`, [join_id, farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])


        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findRequestByID.rows.length == 0 || null) {
            message = "Don't have Request ID " + join_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })

        } else if (checkMember.rows.length != 0) {

            if (checkMember.rows[0].role_id == 1) {
                const delRequest = await pool.query(`DELETE FROM join_farm WHERE join_id = $1 AND farm_id = $2`, [join_id, farm_id]);
                message = "Request Deleted :)"
                console.log(message);
                return res.status(200).send({ data: { message: message } })

            } else {
                message = "You don't have permission to delete!!"
                console.log(message)
                return res.status(500).send({ data: { message: message } })
            }

        } else {
            message = "You are not a member in this farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

    } catch (err) {
        essage = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}