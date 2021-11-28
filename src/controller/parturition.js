const pool = require(`../database/pool`);

exports.getAllParturition = async (req, res) => {

    try {
        message = "Method Error"
        const AllPartu = await pool.query(`SELECT * FROM parturition`);
        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { rows: AllPartu.rows } })

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getParturitionByID = async (req, res) => {

    try {
        const parturition_id = req.body.parturition_id
        const user_id = req.body.user_id
        const farm_id = req.body.farm_id

        if (parturition_id.length == 0 || null) {
            message = "Please Fill Parturition ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
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

            const getPartu = await pool.query("SELECT * FROM parturition WHERE parturition_id = $1", [parturition_id]);
            if (getPartu.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { rows: getPartu.rows } })
            } else {
                message = ("Don't have parturition ID " + parturition_id + " in farm ID " + farm_id);
                console.log(message);
                return res.status(500).send({ data: { message: message } })
            }

        } else {
            message = "You are not a member in this farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getParturitionByFarmID = async (req, res) => {

    try {
        const user_id = req.body.user_id
        const farm_id = req.body.farm_id

        if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
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

            const getPartuByFarm = await pool.query(
                `SELECT * FROM parturition p
                INNER JOIN abdominal a ON a.abdominal_id = p.ab_id
                INNER JOIN cows c ON a.cow_id = c.cow_id
                WHERE farm_id = $1`, [farm_id]);

            if (getPartuByFarm.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, rows: getPartuByFarm.rows } })
            } else {
                message = "Don't have parturition data in farm";
                console.log(message);
                return res.status(200).send({ data: { ment: 2, message: message } })
            }

        } else {
            message = "You are not a member in this farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getDistinctCowByFarmID = async (req, res) => {

    try {

        if (req.body.farm_id.length == 0 || undefined) {
            message = "Farm ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.user_id.length == 0 || undefined) {
            message = "User ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const farm_id = req.body.farm_id
        const user_id = req.body.user_id

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

            const getParByFarm = await pool.query(
                `SELECT DISTINCT a.cow_id, c.cow_name, c.cow_no, c.cow_image FROM abdominal a
                JOIN cows c ON c.cow_id = a.cow_id
				JOIN parturition p ON a.abdominal_id = p.ab_id
                WHERE c.farm_id = $1`, [farm_id]);

            if (getParByFarm.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, rows: getParByFarm.rows } })
            } else {
                message = "Don't have abdominal data in farm";
                console.log(message);
                return res.status(200).send({ data: { ment: 2, message: message } })
            }

        } else {
            message = "You are not a member in this farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getParturitionByCowID = async (req, res) => {

    try {
        const cow_id = req.body.cow_id
        const user_id = req.body.user_id;
        const farm_id = req.body.farm_id;
        message = "Method Error"

        if (cow_id.length == 0 || null) {
            message = "Please Fill Cow ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])
        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])


        if (checkCow.rows.length == 0 || null) {
            message = "Don't have cow ID: " + cow_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            const getPartuByCow = await pool.query(
                `SELECT * FROM parturition p 
                INNER JOIN abdominal a ON a.abdominal_id = p.ab_id 
                INNER JOIN cows c ON a.cow_id = c.cow_id WHERE c.cow_id = $1`, [cow_id]);
            if (getPartuByCow.rows.length != 0) {
                getCount = await pool.query(`SELECT COUNT(*) FROM parturition p 
                JOIN abdominal a ON a.abdominal_id = p.ab_id
                JOIN cows c ON a.cow_id = c.cow_id WHERE a.cow_id = $1`, [cow_id])
                count = getCount.rows[0].count
                getSuccess = await pool.query(`SELECT COUNT(*) FROM parturition p 
                JOIN abdominal a ON a.abdominal_id = p.ab_id
                JOIN cows c ON a.cow_id = c.cow_id WHERE a.cow_id = $1 AND p.par_status = 'ปกติ'`, [cow_id])
                countSuc = getSuccess.rows[0].count
                getFail = await pool.query(`SELECT COUNT(*) FROM parturition p 
                JOIN abdominal a ON a.abdominal_id = p.ab_id
                JOIN cows c ON a.cow_id = c.cow_id WHERE a.cow_id = $1 AND p.par_status = 'แท้ง'`, [cow_id])
                countFail = getFail.rows[0].count

                setPar = []

                parturition_id = getPartuByCow.rows[0].parturition_id
                ab_id = getPartuByCow.rows[0].ab_id
                par_date = getPartuByCow.rows[0].par_date
                calf_name = getPartuByCow.rows[0].calf_name
                calf_sex = getPartuByCow.rows[0].calf_sex
                par_caretaker = getPartuByCow.rows[0].par_caretaker
                par_status = getPartuByCow.rows[0].par_status
                note = getPartuByCow.rows[0].note
                cow_ID = getPartuByCow.rows[0].cow_id
                round = getPartuByCow.rows[0].round
                ab_date = getPartuByCow.rows[0].ab_date
                ab_status = getPartuByCow.rows[0].ab_status
                ab_caretaker = getPartuByCow.rows[0].ab_caretaker
                semen_id = getPartuByCow.rows[0].semen_id
                semen_name = getPartuByCow.rows[0].semen_name
                semen_specie = getPartuByCow.rows[0].semen_specie
                ab_calf = getPartuByCow.rows[0].ab_calf
                note = getPartuByCow.rows[0].note
                type_id = getPartuByCow.rows[0].type_id
                specie_id = getPartuByCow.rows[0].specie_id
                farm_ID = getPartuByCow.rows[0].farm_id
                status_id = getPartuByCow.rows[0].status_id
                cow_no = getPartuByCow.rows[0].cow_no
                cow_name = getPartuByCow.rows[0].cow_name
                cow_birthday = getPartuByCow.rows[0].cow_birthday
                cow_sex = getPartuByCow.rows[0].cow_sex
                mom_id = getPartuByCow.rows[0].mom_id
                mom_specie = getPartuByCow.rows[0].mom_specie
                cow_image = getPartuByCow.rows[0].cow_image

                setPar[0] =
                {
                    parturition_id: parturition_id,
                    count: count,
                    countSuc: countSuc,
                    countFail: countFail,
                    ab_id: ab_id,
                    par_date: par_date,
                    calf_name: calf_name,
                    calf_sex: calf_sex,
                    par_caretaker: par_caretaker,
                    par_status: par_status,
                    note: note,
                    cow_id: cow_ID,
                    round: round,
                    ab_date: ab_date,
                    ab_status: ab_status,
                    ab_caretaker: ab_caretaker,
                    semen_id: semen_id,
                    semen_name: semen_name,
                    semen_specie: semen_specie,
                    ab_calf: ab_calf,
                    note: note,
                    type_id: type_id,
                    specie_id: specie_id,
                    farm_id: farm_ID,
                    status_id: status_id,
                    cow_no: cow_no,
                    cow_name: cow_name,
                    cow_birthday: cow_birthday,
                    cow_sex: cow_sex,
                    mom_id: mom_id,
                    mom_specie: mom_specie,
                    cow_image: cow_image,
                }

                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, rows: setPar } })
            } else {
                message = "Cow id " + cow_id + " don't have parturition data";
                console.log(message);
                return res.status(200).send({ data: { ment: 2, message: message } })
            }

        } else {
            message = "You are not a member in this farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.addNewParturition = async (req, res) => {

    try {
        const ab_id = req.body.ab_id
        let par_date = req.body.par_date
        let calf_name = req.body.calf_name
        let calf_sex = req.body.calf_sex
        let par_caretaker = req.body.par_caretaker
        let par_status = req.body.par_status
        let note = req.body.note

        const user_id = req.body.user_id;
        const farm_id = req.body.farm_id

        if (ab_id.length == 0 || null) {
            message = "Please Fill AB ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkAb = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1`, [ab_id])
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
        } else if (checkAb.rows.length == 0 || null) {
            message = "Don't have abdominal ID: " + abdominal_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            const addPar = await pool.query(`INSERT INTO parturition (ab_id, par_date, calf_name, calf_sex, par_caretaker, par_status, note) values ($1,$2,$3,$4,$5,$6,$7)`,
                [ab_id, par_date, calf_name, calf_sex, par_caretaker, par_status, note]);

            const UpdateAb = await pool.query(`UPDATE abdominal SET ab_calf = $1 WHERE abdominal_id = $2`, ['t', ab_id]);

            const checkAdd = await pool.query(`SELECT * FROM parturition WHERE ab_id = $1 AND par_date = $2 AND calf_name = $3 AND calf_sex = $4`, [ab_id, par_date, calf_name, calf_sex])
            message = "Parturition Created :)"
            console.log(message);
            return res.status(200).send({ data: { message: message, rows: checkAdd.rows } })

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

exports.updateParturitionByID = async (req, res) => {

    try {
        const parturition_id = req.body.parturition_id
        const ab_id = req.body.ab_id
        let par_date = req.body.par_date
        let calf_name = req.body.calf_name
        let calf_sex = req.body.calf_sex
        let par_caretaker = req.body.par_caretaker
        let par_status = req.body.par_status
        let note = req.body.note

        const user_id = req.body.user_id;
        const farm_id = req.body.farm_id

        message = "Cannot update parturition"

        if (parturition_id.length == 0 || null) {
            message = "Please Fill Parturition ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (ab_id.length == 0 || null) {
            message = "Please Fill Ab ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const findByID = await pool.query(`SELECT * FROM parturition WHERE parturition_id = ` + parturition_id)
        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])

        if (findByID.rows.length == 0 || null) {
            message = "Don't have parturition ID " + parturition_id;
            return res.status(500).send({ data: { message: message } })
        } else if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } if (checkMember.rows.length != 0) {

            const upDatePar = await pool.query(`UPDATE parturition SET ab_id = $1, par_date = $2, calf_name = $3, calf_sex = $4, par_caretaker = $5, par_status = $6, note = $7 WHERE parturition_id = $8`,
                [ab_id, par_date, calf_name, calf_sex, par_caretaker, par_status, note, parturition_id]);

            const checkUpdate = await pool.query(`SELECT * FROM parturition WHERE parturition_id = ` + parturition_id)
            message = "Parturition Updated :)"
            console.log(message);
            return res.status(200).send({ data: { message: message, rows: checkUpdate.rows } })

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

exports.deleteParturitionByID = async (req, res) => {

    try {
        let user_id = req.body.user_id
        let farm_id = req.body.farm_id
        const parturition_id = req.body.parturition_id
        message = "Cannot Delete parturition"

        if (parturition_id.length == 0 || null) {
            message = "Please Fill Parturition ID"
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

        const findByID = await pool.query(`SELECT * FROM parturition WHERE parturition_id = ` + parturition_id)
        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])


        if (findByID.rows.length == 0 || null) {
            message = "Don't have parturition ID " + parturition_id;
            return res.status(500).send({ data: { message: message } })
        } else if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            if (checkMember.rows[0].role_id == 1) {
                const ret = await pool.query(`DELETE FROM parturition WHERE parturition_id = $1`, [parturition_id]);
                message = "Parturition Deleted :)"
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
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}