const e = require("express");
const pool = require(`../database/pool`);

exports.getAllSchedule = async (req, res) => {

    try {
        message = "Cannot get data!!"

        const getAll = await pool.query(`SELECT * FROM vaccine_schedule vs 
        JOIN vaccines v ON v.vaccine_id = vs.vaccine_id 
        JOIN cows c ON c.cow_id = vs.cow_id `);

        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { rows: getAll.rows } })

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getScheduleByID = async (req, res) => {

    try {

        if (req.body.schedule_id.length == 0 || undefined) {
            message = "Schedule ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const schedule_id = req.body.schedule_id

        const checkScheID = await pool.query(`SELECT * FROM vaccine_schedule WHERE schedule_id = ` + schedule_id)

        if (checkScheID.rows.length == 0 || null) {
            message = "Don't have Schedule ID " + schedule_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: checkScheID.rows } })
        }

    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getScheduleByFarmID = async (req, res) => {

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

            const getScheByFarm = await pool.query(
                `SELECT * FROM vaccine_schedule vs 
                    INNER JOIN cows c ON c.cow_id = vs.cow_id
                    INNER JOIN vaccines v ON v.vaccine_id = vs.vaccine_id
                    WHERE c.farm_id = $1`, [farm_id]);

            if (getScheByFarm.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, rows: getScheByFarm.rows } })
            } else {
                message = "Don't have schedule data in farm";
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

exports.getDistinctVacByFarmID = async (req, res) => {

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

            const getScheByFarm = await pool.query(
                `SELECT DISTINCT v.vaccine_id, v.vac_name_th, v.vac_name_en FROM vaccine_schedule vs
                JOIN cows c ON c.cow_id = vs.cow_id 
                JOIN vaccines v ON v.vaccine_id = vs.vaccine_id
                WHERE c.farm_id = $1`, [farm_id]);

            if (getScheByFarm.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, rows: getScheByFarm.rows } })
            } else {
                message = "Don't have schedule data in farm";
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

exports.getDistinctCowByVacID = async (req, res) => {

    try {

        if (req.body.farm_id.length == 0 || undefined) {
            message = "Farm ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.user_id.length == 0 || undefined) {
            message = "User ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.vaccine_id.length == 0 || undefined) {
            message = "Vaccine ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const farm_id = req.body.farm_id
        const user_id = req.body.user_id
        const vaccine_id = req.body.vaccine_id

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])
        const checkVac = await pool.query(`SELECT * FROM farms f JOIN cows c ON c.farm_id = f.farm_id
        JOIN vaccine_schedule vs ON vs.cow_id = c.cow_id WHERE vs.vaccine_id = $1`, [vaccine_id])

        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have Farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkVac.rows.length == 0 || null) {
            message = "Don't have Vac ID: " + vaccine_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })

        } else if (checkMember.rows.length != 0) {
            
            if (checkVac.rows.length > 0) {
                const getCowByVac = await pool.query(`SELECT DISTINCT c.cow_id, c.cow_no, c.cow_name, c.cow_image, vs.vaccine_id, v.vac_name_th, v.vac_name_en  
                FROM vaccine_schedule vs
                JOIN cows c ON c.cow_id = vs.cow_id 
                JOIN vaccines v ON v.vaccine_id = vs.vaccine_id
                WHERE vs.vaccine_id = $1 and c.farm_id = $2`, [vaccine_id, farm_id]);
                if (getCowByVac.rows.length != 0) {
                    message = "Sussess :)"
                    console.log(message);
                    return res.status(200).send({ data: { ment: 1, rows: getCowByVac.rows } })
                } else {
                    message = "Vac id " + vaccine_id + " don't have vaccine data";
                    console.log(message);
                    return res.status(200).send({ data: { ment: 2, message: message } })
                }
            } else {
                message = "Don't have vac ID " + vaccine_id + " in farm ID " + farm_id
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

exports.getVacScheduleByCowID = async (req, res) => {

    try {

        if (req.body.farm_id.length == 0 || undefined) {
            message = "Farm ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.user_id.length == 0 || undefined) {
            message = "User ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.cow_id.length == 0 || undefined) {
            message = "Cow ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.vaccine_id.length == 0 || undefined) {
            message = "Vaccine ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const cow_id = req.body.cow_id
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id
        const vaccine_id = req.body.vaccine_id

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])
        const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])
        const checkVac = await pool.query(`SELECT * FROM vaccines WHERE vaccine_id = $1`, [vaccine_id])

        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkCow.rows.length == 0 || null) {
            message = "Don't have cow ID: " + cow_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkVac.rows.length == 0 || null) {
            message = "Don't have Vaccine ID: " + vaccine_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }
        
        else if (checkMember.rows.length != 0) {

            const cowInFarm = await pool.query(`SELECT * FROM cows WHERE cow_id = $1 AND farm_id = $2`, [cow_id, farm_id])
            
            if (cowInFarm.rows.length > 0) {
                const getScheByCow = await pool.query(`SELECT * FROM farms f
                    JOIN cows c ON c.farm_id = f.farm_id
                    JOIN vaccine_schedule vs ON vs.cow_id = c.cow_id
                    JOIN vaccines v ON vs.vaccine_id = v.vaccine_id
                    WHERE vs.vaccine_id = $1 and vs.cow_id = $2 and f.farm_id = $3`, [vaccine_id, cow_id, farm_id]);
                if (getScheByCow.rows.length != 0) {
                    message = "Sussess :)"
                    console.log(message);
                    return res.status(200).send({ data: { ment: 1, rows: getScheByCow.rows } })
                } else {
                    message = "Cow id " + cow_id + " don't have vaccine data";
                    console.log(message);
                    return res.status(200).send({ data: { ment: 2, message: message } })
                }
            } else {
                message = "Don't have cow ID " + cow_id + " in farm ID " + farm_id
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

exports.getScheduleByCowID = async (req, res) => {

    try {

        if (req.body.farm_id.length == 0 || undefined) {
            message = "Farm ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.user_id.length == 0 || undefined) {
            message = "User ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.cow_id.length == 0 || undefined) {
            message = "Cow ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const cow_id = req.body.cow_id
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])
        const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])

        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkCow.rows.length == 0 || null) {
            message = "Don't have cow ID: " + cow_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })

        } else if (checkMember.rows.length != 0) {
            const cowInFarm = await pool.query(`SELECT * FROM cows WHERE cow_id = $1 AND farm_id = $2`, [cow_id, farm_id])
            if (cowInFarm.rows.length > 0) {
                const getScheByCow = await pool.query(`SELECT * FROM vaccine_schedule vs
                INNER JOIN vaccines v ON v.vaccine_id = vs.vaccine_id
                INNER JOIN cows c ON vs.cow_id = c.cow_id WHERE vs.cow_id = $1`, [cow_id]);
                if (getScheByCow.rows.length != 0) {
                    message = "Sussess :)"
                    console.log(message);
                    return res.status(200).send({ data: { ment: 1, rows: getScheByCow.rows } })
                } else {
                    message = "Cow id " + cow_id + " don't have parturition data";
                    console.log(message);
                    return res.status(200).send({ data: { ment: 2, message: message } })
                }
            } else {
                message = "Don't have cow ID " + cow_id + " in farm ID " + farm_id
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

exports.addNewSchedule = async (req, res) => {

    try {

        if (req.body.farm_id.length == 0 || undefined) {
            message = "Farm ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.user_id.length == 0 || undefined) {
            message = "User ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.cow_id.length == 0 || undefined) {
            message = "Cow ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.vaccine_id.length == 0 || undefined) {
            message = "Vaccine ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }
        

        const vaccine_id = req.body.vaccine_id
        const cow_id = req.body.cow_id
        let vac_date = req.body.vac_date
        let next_date = req.body.next_date
        let note = req.body.note
        message = "Cannot create new schedule"

        const farm_id = req.body.farm_id
        const user_id = req.body.user_id

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])
        const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])
        const checkVac = await pool.query(`SELECT * FROM vaccines WHERE vaccine_id = $1`, [vaccine_id])


        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkCow.rows.length == 0 || null) {
            message = "Don't have cow ID: " + cow_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkVac.rows.length == 0 || null) {
            message = "Don't have Vaccine ID: " + vaccine_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            const addShedule = await pool.query(`INSERT INTO vaccine_schedule (vaccine_id, cow_id, vac_date, next_date, note) values ($1,$2,$3,$4,$5)`,
                [vaccine_id, cow_id, vac_date, next_date, note]);
            const checkAdd = await pool.query(`SELECT * FROM vaccine_schedule WHERE vaccine_id = $1 AND cow_id = $2 AND vac_date = $3 ORDER BY schedule_id DESC`, [vaccine_id, cow_id, vac_date])
            message = "Schedule Created :)"

            console.log(message);
            return res.status(200).send({ message: message, rows: checkAdd.rows[0] })

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

exports.updateScheduleByID = async (req, res) => {

    try {

        if (req.body.farm_id.length == 0 || undefined) {
            message = "Farm ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.user_id.length == 0 || undefined) {
            message = "User ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.cow_id.length == 0 || undefined) {
            message = "Cow ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.vaccine_id.length == 0 || undefined) {
            message = "Vaccine ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.schedule_id.length == 0 || undefined) {
            message = "Schedule ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const schedule_id = req.body.schedule_id
        const vaccine_id = req.body.vaccine_id
        const cow_id = req.body.cow_id
        let vac_date = req.body.vac_date
        let next_date = req.body.next_date
        let note = req.body.note
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id
        message = "Cannot update schedule"

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])
        const findSche = await pool.query(`SELECT * FROM vaccine_schedule WHERE schedule_id = ` + schedule_id)
        const findCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])
        const findVac = await pool.query(`SELECT * FROM vaccines WHERE vaccine_id = $1`, [vaccine_id])


        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findSche.rows.length == 0 || null) {
            message = "Don't have schedule ID " + schedule_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findCow.rows.length == 0 || null) {
            message = "Don't have cow ID " + cow_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findVac.rows.length == 0 || null) {
            message = "Don't have vaccine ID " + vaccine_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            const updateSche = await pool.query(`UPDATE vaccine_schedule SET vaccine_id = $1, cow_id = $2, vac_date = $3, next_date = $4, note = $5 WHERE schedule_id = $6`,
                [vaccine_id, cow_id, vac_date, next_date, note, schedule_id]);

            const checkUpdate = await pool.query(`SELECT * FROM vaccine_schedule WHERE schedule_id = ` + schedule_id)
            message = "Schedule Updated :)"
            console.log(message);
            return res.status(200).send({ message: message, rows: checkUpdate.rows })

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

exports.deleteScheduleByID = async (req, res) => {

    try {

        if (req.body.farm_id.length == 0 || undefined) {
            message = "Farm ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.user_id.length == 0 || undefined) {
            message = "User ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.schedule_id.length == 0 || undefined) {
            message = "Schedule ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const schedule_id = req.body.schedule_id
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id
        message = "Cannot Delete schedule"


        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])
        const checkSche = await pool.query(`SELECT * FROM vaccine_schedule WHERE schedule_id = ` + schedule_id)

        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkSche.rows.length == 0 || null) {
            message = "Don't have schedule ID " + schedule_id;
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            if (checkMember.rows[0].role_id == 1) {
                const sche_cow_id = checkSche.rows[0].cow_id

                const checkScheInFarm = await pool.query(`SELECT * FROM cows WHERE cow_id = $1 AND farm_id = $2`, [sche_cow_id, farm_id])
                if (checkScheInFarm != 0) {
                    const deleteSche = await pool.query(`DELETE FROM vaccine_schedule WHERE schedule_id = $1`, [schedule_id]);
                    message = "Schedule Deleted :)"
                    console.log(message);
                    return res.status(200).send({ data: { message: message } })
                } else {
                    message = "This schedule is not on this farm"
                    console.log(message);
                    return res.status(500).send({ data: { message: message } })
                }


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
        console.error(err.message)
    }
    return res.status(500).send({ data: { message: message } })

}