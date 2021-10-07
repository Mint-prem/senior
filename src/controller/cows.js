const pool = require('../database/pool');

exports.getAllCow = async (req, res) => {

    try {

        const getAllCow = await pool.query(`SELECT * FROM cows`);
        message = "Success :)"
        console.log(message);
        return res.status(200).send({ data: { count: getAllCow.rowCount, cows: getAllCow.rows } })

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    return res.status(500).send({ data: { message: message } })
}

exports.getCowByID = async (req, res) => {

    try {
        let cow_id = req.body.cow_id

        let user_id = req.body.user_id
        let farm_id = req.body.farm_id


        if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (cow_id.length == 0 || null) {
            message = "Please Fill Cow ID"
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
            
            const getCow = await pool.query(
                `SELECT * FROM cows c
                INNER JOIN cow_type t ON c.type_id = t.type_id 
                INNER JOIN species spe ON c.specie_id = spe.specie_id
                INNER JOIN cow_status sta ON c.status_id = sta.status_id 
                WHERE c.cow_id = $1 AND c.farm_id = $2`, [cow_id, farm_id]
            );
    
            if (getCow.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { rows: getCow.rows } })
            } else {
                message = "Don't have Cow ID : " + cow_id + " in farm ID " + farm_id
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

exports.getCowsByFarm = async (req, res) => {

    try {
        const user_id = req.body.user_id;
        const farm_id = req.body.farm_id;
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

        const checkfarm = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])

        if (checkfarm.rows.length == 0 || null) {
            message = "Don't have Farm ID : " + farm_id
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID : " + user_id
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else {

            const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])
            console.log(checkMember.rowCount)

            if (checkMember.rows.length == 1) {
                const getCowInFarm = await pool.query(
                    `SELECT * FROM cows 
                        INNER JOIN cow_type ON cows.type_id = cow_type.type_id 
                        INNER JOIN species ON cows.specie_id = species.specie_id
                        INNER JOIN cow_status ON cows.status_id = cow_status.status_id 
                        WHERE farm_id = $1`, [farm_id]
                )

                if (getCowInFarm.rows.length == 0 || null) {
                    message = "Don't have cow in farm ID: " + farm_id
                    console.log(message)
                    return res.status(200).send({ data: { ment: 2, message: message } })
                } else {
                    message = "Success :)"
                    console.log(message)
                    return res.status(200).send({ data: { ment: 1, rows: getCowInFarm.rows } })
                }
            } else {
                message = "You are not a member in this farm"
                console.log(message)
                return res.status(500).send({ data: { message: message } })
            }
        }

    } catch (err) {
        message = "Error"
        console.error(err)
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getCowsByUser = async (req, res) => {

    try {
        const user_id = req.body.user_id;
        message = "Method Error"

        const check = await pool.query(`SELECT * FROM workers w WHERE user_id = $1`, [user_id])
        const farm_id = check.rows[0].farm_id;

        if (check.rows.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else {

            const checkfarm = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
            if (checkfarm.rows.length == 0 || null) {
                message = "Don't have Farm ID : " + farm_id
                console.log(message)
                return res.status(500).send({ data: { message: message } })
            } else {
                const getCowInFarm = await pool.query(
                    `SELECT * FROM cows 
                    INNER JOIN cow_type ON cows.type_id = cow_type.type_id 
                    INNER JOIN species ON cows.specie_id = species.specie_id
                    INNER JOIN cow_status ON cows.status_id = cow_status.status_id 
                    WHERE farm_id = $1`, [farm_id]
                )

                if (getCowInFarm.rows.length == 0 || null) {
                    message = "Don't have cow in farm ID: " + farm_id
                    console.log(message)
                    return res.status(200).send({ data: { rows: message } })
                } else {
                    message = "Success :)"
                    console.log(message)
                    return res.status(200).send({ data: { rows: getCowInFarm.rows } })
                }
            }
        }

    } catch (err) {
        message = "Error"
        console.error(err)
    }
    return res.status(500).send({ data: { message: message } })
}

exports.addNewCow = async (req, res) => {

    try {

        let cow_no = req.body.cow_no
        let cow_name = req.body.cow_name
        let cow_birthday = req.body.cow_birthday
        let cow_sex = req.body.cow_sex
        let semen_id = req.body.semen_id
        let semen_specie = req.body.semen_specie
        let mom_id = req.body.mom_id
        let mom_specie = req.body.mom_specie
        let cow_image = req.body.cow_image
        let note = req.body.note
        const type_id = req.body.type_id
        const specie_id = req.body.specie_id
        const farm_id = req.body.farm_id
        let status_id = req.body.status_id
        const user_id = req.body.user_id


        message = "Method Error"

        if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (cow_no.length == 0 || null) {
            message = "Please Fill Cow No"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
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

            const checkCowNoInFarm = await pool.query(`SELECT * FROM cows WHERE cow_no = $1 AND farm_id = $2`, [cow_no, farm_id])

            if (checkCowNoInFarm.rows.length > 0) {
                message = "Cow_No already exist in farm"
                console.log(message)
                return res.status(500).send({ data: { message: message } })
            }

            const addCow = await pool.query(`INSERT INTO cows (type_id, specie_id, farm_id, status_id, cow_no, cow_name, cow_birthday, cow_sex, semen_id, semen_specie, mom_id, mom_specie, cow_image, note) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
                [type_id, specie_id, farm_id, status_id, cow_no, cow_name, cow_birthday, cow_sex, semen_id, semen_specie, mom_id, mom_specie, cow_image, note]);
            message = "Cow Created :)"
            console.log(message);

            const checkNewCow = await pool.query(`SELECT * FROM cows WHERE cow_no = $1 AND farm_id = $2`, [cow_no, farm_id])
            return res.status(200).send({ data: { message: message, rows: checkNewCow.rows } })

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

exports.updateCowByID = async (req, res) => {

    try {
        const cow_id = req.body.cow_id
        let cow_no = req.body.cow_no
        let cow_name = req.body.cow_name
        let cow_birthday = req.body.cow_birthday
        let cow_sex = req.body.cow_sex
        let cow_image = req.body.cow_image
        let note = req.body.note
        const type_id = req.body.type_id
        const specie_id = req.body.specie_id
        let status_id = req.body.status_id
        let semen_id = req.body.semen_id;
        let semen_specie = req.body.semen_specie
        let mom_id = req.body.mom_id
        let mom_specie = req.body.mom_specie

        const user_id = req.body.user_id
        const farm_id = req.body.farm_id
        message = "Method Error"

        if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (cow_id.length == 0 || null) {
            message = "Please Fill Cow ID"
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
            const findCowInFarm = await pool.query(`SELECT * FROM cows WHERE cow_id = $1 AND farm_id = $2`, [cow_id, farm_id])

            if (findCowInFarm.rows.length == 0 || null) {
                message = "Don't found Cow ID: " + cow_id + " in Farm ID: " + farm_id;
                console.log(message)
                return res.status(500).send({ data: { message: message } })
            } else {

                const checkCowNoInFarm = await pool.query(`SELECT * FROM cows WHERE cow_no = $1 AND farm_id = $2 AND cow_id <> $3`, [cow_no, farm_id, cow_id])
 
                if (checkCowNoInFarm.rows.length > 0) {
                    message = "Cow_No already exist"
                    console.log(message)
                    return res.status(500).send({ data: { message: message } })
                }
                
                const editCow = await pool.query(`UPDATE cows SET type_id = $1, specie_id = $2, farm_id = $3, status_id = $4, cow_no = $5, cow_name = $6, cow_birthday = $7, cow_sex = $8, semen_id = $9, semen_specie = $10, mom_id = $11, mom_specie = $12, cow_image = $13, note = $14 WHERE cow_id = $15`,
                    [type_id, specie_id, farm_id, status_id, cow_no, cow_name, cow_birthday, cow_sex, semen_id, semen_specie, mom_id, mom_specie, cow_image, note, cow_id]);
                message = "Cow Updated :)"
                console.log(message);

                const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])
                console.log(checkCow.rows)
                return res.status(200).send({ data: { message: message, rows: checkCow.rows } })

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

exports.deleteCowByID = async (req, res) => {

    try {
        let cow_id = req.body.cow_id
        let user_id = req.body.user_id
        let farm_id = req.body.farm_id
        message = "Method Error"

        if (cow_id.length == 0 || null) {
            message = "Please Fill Cow ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (user_id.length == 0 || null) {
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
        const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1 AND farm_id = $2`, [cow_id, farm_id])

        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkCow.rows.length == 0 || null) {
            message = "Don't have cow ID: " + cow_id + " in farm ID: " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })

        } else if (checkMember.rows.length != 0) {

            if (checkMember.rows[0].role_id == 1) {
                const deleteCow = await pool.query(`DELETE FROM cows WHERE cow_id = $1 AND farm_id = $2`, [cow_id, farm_id]);
                message = "Cow Deleted :)"
                console.log(message);
                return res.status(500).send({ data: { message: message } })
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
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}
