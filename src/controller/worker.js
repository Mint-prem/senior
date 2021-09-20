const pool = require(`../database/pool`);

exports.getAllWorker = async (req, res) => {

    try {
        message = "Method Error"

        const getAllWorker = await pool.query(`SELECT * FROM workers`);
        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { count: getAllWorker.rowCount, rows: getAllWorker.rows } })
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

exports.getWorkerByID = async (req, res) => {

    try {
        let worker_id = req.body.worker_id;
        message = "Method Error"

        if (worker_id.length == 0 || null) {
            message = "Please Fill Worker ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const getWorkerByID = await pool.query(`SELECT * FROM workers WHERE worker_id = $1`, [worker_id])
        if (getWorkerByID.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: getWorkerByID.rows } })
        } else {
            message = ("Don't have worker ID " + worker_id);
            return res.status(500).send({ data: { message: message } });
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

exports.getWorkerByUserID = async (req, res) => {

    try {
        let user_id = req.body.user_id;
        message = "Method Error"

        if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const getWorkerByUserID = await pool.query(`SELECT * FROM workers WHERE user_id = $1`, [user_id])
        if (getWorkerByUserID.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: getWorkerByUserID.rows } })
        } else {
            message = ("Don't have worker that has a user ID " + user_id);
            return res.status(500).send({ data: { message: message } });
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

exports.getWorkerByFarm = async (req, res) => {

    try {
        let farm_id = req.body.farm_id;
        message = "Method Error"

        if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else {
            const checkFarmID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
            if (checkFarmID.rows.length == 0 || null) {
                message = "Don't have Farm ID: " + farm_id
                console.log(message)
                return res.status(500).send({ data: { message: message } })
            }
        }

        const getWorkerByFarmID = await pool.query(`SELECT * FROM workers WHERE farm_id = $1`, [farm_id])

        if (getWorkerByFarmID.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { counts: getWorkerByFarmID.rowCount, rows: getWorkerByFarmID.rows } })
        } else {
            message = ("Don't have worker in Farm ID " + farm_id);
            return res.status(500).send({ data: { message: message } });
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

exports.addNewWorker = async (req, res) => {

    try {
        const user_id = req.body.user_id
        const farm_id = req.body.farm_id

        message = "Method Error"
        const date = new Date();
        var startwork = date.toISOString();

        if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkHaveUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const checkHaveFarm = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])


        if (checkHaveUser.rows.length == 0 || null) {
            message = "Don't have user ID: " + user_id
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkHaveFarm.rows.length == 0 || null) {
            message = "Don't have farm ID: " + farm_id
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const addWorker = await pool.query(`INSERT INTO workers (role_id, farm_id, user_id, startwork) values ($1,$2,$3,$4)`,
            [2, farm_id, user_id, startwork]);

        const checkUser = await pool.query(`SELECT * FROM workers WHERE user_id = $1`, [user_id])

        if (checkUser.rows.length != 0) {
            message = "Worker Add :)"
            console.log(message);
            return res.status(200).send({ data: { counts: checkUser.rowCount, rows: checkUser.rows } })
        } else {
            message = "Can't Add Worker"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

exports.updateWorkerByID = async (req, res) => {

    try {
        //logic ยังไม่ครอบคลุม
        const worker_id = req.body.worker_id
        const user_id = req.body.user_id
        const farm_id = req.body.farm_id
        const startwork = req.body.startwork
        message = "Method Error"

        if (worker_id.length == 0 || null) {
            message = "Please Fill Worker ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (startwork.length == 0 || null) {
            message = "Please Fill Startwork"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const findWorker = await pool.query(`SELECT * FROM workers WHERE worker_id = ` + worker_id)

        if (findWorker.rows.length == 0 || null) {
            message = "Don't have worker ID " + id;
            return res.status(500).send({ data: { message: message } })
        }
        const updateWorker = await pool.query(`UPDATE worker SET role_id = $1, farm_id = $2, user_id = $3, startwork = $4 WHERE worker_id = $5`,
            [role_id, farm_id, user_id, startwork, worker_id]);

        const newUpdate = await pool.query(`SELECT * FROM workers WHERE worker_id = ` + worker_id)

        message = "Worker Updated :)"
        console.log(message);

        return res.status(200).send({ data: { message: message, rows: newUpdate.rows } })

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.deleteWorkerByUserID = async (req, res) => {

    try {
        //logic ยังไม่ครอบคลุม
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id
        message = "Method Error"

        if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const findByID = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2` ,[user_id, farm_id])

        if (findByID.rows.length == 0 || null) {
            message = "Don't have user ID " + user_id + " in Farm ID: " + farm_id;
            return res.status(500).send({ data: { message: message } })
        }
        const deleteWorker = await pool.query(`DELETE FROM worker WHERE farm_id = $1 AND user_id = $2`, [farm_id, user_id]);
        message = "Worker Deleted :)"
        console.log(message);
        return res.status(200).send({ data: { message: message } })

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    return res.status(500).send({ data: { message: message } })

    // try {
    //     const user_id = req.body.user_id
    //     message = "Method Error"

    //     if (user_id.length == 0 || null) {
    //         message = "Please Fill User ID"
    //         console.log(message)
    //         res.status(500).send({ data: { message: message } })
    //     } else {
    //         const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])

    //         if(checkUser.rows.length==0||null){
    //             message = "Don't have User ID: " + user_id
    //             console.log(message)
    //             res.status(500).send({ data: { message: message } })
    //         }  else {
    //             const checkWorker = await pool.query("SELECT * FROM workers WHERE user_id = $1", [user_id]);

    //             if(checkWorker.rows.length != 0){


    //             } else{
    //                 message = "User don't have Farm yet"
    //                 console.log(message)
    //                 res.status(500).send({ data: { message: message } })
    //             }
    //         }
    //     }

}