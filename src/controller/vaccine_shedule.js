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
        const schedule_id = req.body.schedule_id

        if (schedule_id.length == 0 || null) {
            message = "Please Fill Schedule ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

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
        const farm_id = req.body.farm_id

        if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])

        if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ message: message })
        }

        const getScheByFarm = await pool.query(
            `SELECT * FROM vaccine_schedule vs 
            INNER JOIN cows c ON c.cow_id = vs.cow_id
            WHERE c.farm_id = $1`, [farm_id]);

        if (getScheByFarm.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { ment: 1, rows: getScheByFarm.rows } })
        } else {
            message = "Don't have parturition data in farm";
            console.log(message);
            return res.status(200).send({ data: { ment: 2, message: message } })
        }

    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getScheduleByCowID = async (req, res) => {

    try {
        const cow_id = req.body.cow_id

        if (cow_id.length == 0 || null) {
            message = "Please Fill Cow ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])

        if (checkCow.rows.length == 0 || null) {
            message = "Don't have cow ID: " + cow_id;
            console.log(message)
            return res.status(500).send({ message: message })
        }

        const getScheByCow = await pool.query(`SELECT * FROM vaccine_schedule WHERE cow_id = $1`, [cow_id]);

        if (getScheByCow.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { ment: 1, rows: getScheByCow.rows } })
        } else {
            message = "Cow id " + cow_id + " don't have parturition data";
            console.log(message);
            return res.status(200).send({ data: { ment: 2, message: message } })
        }

    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.addNewSchedule = async (req, res) => {

    try {
        const vaccine_id = req.body.vaccine_id
        const cow_id = req.body.cow_id
        let vac_date = req.body.vac_date
        let next_date = req.body.next_date
        let note = req.body.note
        message = "Cannot create new schedule"

        if (cow_id.length == 0 || null) {
            message = "Please Fill Cow ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (vaccine_id.length == 0 || null) {
            message = "Please Fill Vaccine ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])
        const checkVac = await pool.query(`SELECT * FROM vaccines WHERE vaccine_id = $1`, [vaccine_id])

        if (checkCow.rows.length == 0 || null) {
            message = "Don't have cow ID: " + cow_id;
            console.log(message)
            return res.status(500).send({ message: message })
        } else if (checkVac.rows.length == 0 || null) {
            message = "Don't have Vaccine ID: " + vaccine_id;
            console.log(message)
            return res.status(500).send({ message: message })
        } else {
            const addShedule = await pool.query(`INSERT INTO vaccine_schedule (vaccine_id, cow_id, vac_date, next_date, note) values ($1,$2,$3,$4,$5)`,
                [vaccine_id, cow_id, vac_date, next_date, note]);
            const checkAdd = await pool.query(`SELECT * FROM vaccine_schedule WHERE vaccine_id = $1 AND cow_id = $2 AND vac_date = $3`, [vaccine_id, cow_id, vac_date])
            message = "Schedule Created :)"

            console.log(message);
            return res.status(200).send({ message: message, rows: checkAdd.rows })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ message: message })
}

exports.updateScheduleByID = async (req, res) => {

    try {
        const schedule_id = req.body.schedule_id
        const vaccine_id = req.body.vaccine_id
        const cow_id = req.body.cow_id
        let vac_date = req.body.vac_date
        let next_date = req.body.next_date
        let note = req.body.note
        message = "Cannot update schedule"

        if (schedule_id.length == 0 || null) {
            message = "Please Fill Schedule ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (cow_id.length == 0 || null) {
            message = "Please Fill Cow ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (vaccine_id.length == 0 || null) {
            message = "Please Fill Vaccine ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const findSche = await pool.query(`SELECT * FROM vaccine_schedule WHERE schedule_id = ` + schedule_id)
        const findCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])
        const findVac = await pool.query(`SELECT * FROM vaccines WHERE vaccine_id = $1`, [vaccine_id])


        if (findSche.rows.length == 0 || null) {
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
        } else {

            const updateSche = await pool.query(`UPDATE vaccine_schedule SET vaccine_id = $1, cow_id = $2, vac_date = $3, next_date = $4, note = $5 WHERE schedule_id = $6`,
                [vaccine_id, cow_id, vac_date, next_date, note, schedule_id]);

            const checkUpdate = await pool.query(`SELECT * FROM vaccine_schedule WHERE schedule_id = ` + schedule_id)
            message = "Schedule Updated :)"
            console.log(message);
            return res.status(200).send({ message: message, rows: checkUpdate.rows })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.deleteScheduleByID = async (req, res) => {

        try {
            const schedule_id = req.body.schedule_id
            message = "Cannot Delete schedule"

            if (schedule_id.length == 0 || null) {
                message = "Please Fill Schedule ID"
                console.log(message)
                return res.status(500).send({ data: { message: message } })
            }

            const checkSche = await pool.query(`SELECT * FROM vaccine_schedule WHERE schedule_id = ` + schedule_id)
        
            if (checkSche.rows.length == 0 || null) {
                message = "Don't have schedule ID " + schedule_id;
                return res.status(500).send({ data: { message: message } })
            } else {
                const deleteSche = await pool.query(`DELETE FROM vaccine_schedule WHERE schedule_id = $1`, [schedule_id]);
                message = "Schedule Deleted :)"
                console.log(message);
                return res.status(200).send({ data: { message: message } })
            }
            
        } catch (err) {
            message = "Error"
            console.error(err.message)
        }
    return res.status(500).send({ data: { message: message } })

}