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

        if (parturition_id.length == 0 || null) {
            message = "Please Fill Parturition ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const getPartu = await pool.query("SELECT * FROM parturition WHERE parturition_id = $1", [parturition_id]);
        if (getPartu.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: getPartu.rows } })
        } else {
            message = ("Don't have parturition ID " + parturition_id);
            console.log(message);
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

        const getPartuByFarm = await pool.query(
            `SELECT * FROM parturition 
            INNER JOIN cows ON cows.cow_id = parturition.cow_id
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
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getParturitionByCowID = async (req, res) => {

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

        const getPartuByCow = await pool.query("SELECT * FROM parturition WHERE cow_id = $1", [cow_id]);
        if (getPartuByCow.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { ment: 1, rows: getPartuByCow.rows } })
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

exports.addNewParturition = async (req, res) => {

    try {
        const cow_id = req.body.cow_id
        let par_date = req.body.par_date
        let calf_name = req.body.calf_name
        let calf_sex = req.body.calf_sex
        let par_caretaker = req.body.par_caretaker
        let note = req.body.note

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
        } else {
            const addPar = await pool.query(`INSERT INTO parturition (cow_id, par_date, calf_name, calf_sex, par_caretaker, note) values ($1,$2,$3,$4,$5,$6)`,
                [cow_id, par_date, calf_name, calf_sex, par_caretaker, note]);

            const checkAdd = await pool.query(`SELECT * FROM parturition WHERE cow_id = $1 AND par_date = $2 AND calf_name = $3 AND calf_sex = $4`, [cow_id, par_date, calf_name, calf_sex])
            message = "Parturition Created :)"
            console.log(message);
            return res.status(200).send({ message: message, rows: checkAdd.rows })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ message: message })
}

exports.updateParturitionByID = async (req, res) => {

    try {
        const parturition_id = req.body.parturition_id
        const cow_id = req.body.cow_id
        let par_date = req.body.par_date
        let calf_name = req.body.calf_name
        let calf_sex = req.body.calf_sex
        let par_caretaker = req.body.par_caretaker
        let note = req.body.note
        message = "Cannot update parturition"

        if (parturition_id.length == 0 || null) {
            message = "Please Fill Parturition ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (cow_id.length == 0 || null) {
            message = "Please Fill Cow ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const findByID = await pool.query(`SELECT * FROM parturition WHERE parturition_id = ` + parturition_id)

        if (findByID.rows.length == 0 || null) {
            message = "Don't have parturition ID " + parturition_id;
            return res.status(500).send({ data: { message: message } })
        } else {
            const upDatePar = await pool.query(`UPDATE parturition SET cow_id = $1, par_date = $2, calf_name = $3, calf_sex = $4, par_caretaker = $5, note = $6 WHERE parturition_id = $7`,
                [cow_id, par_date, calf_name, calf_sex, par_caretaker, note, parturition_id]);

            const checkUpdate = await pool.query(`SELECT * FROM parturition WHERE parturition_id = ` + parturition_id)
            message = "Parturition Updated :)"
            console.log(message);
            return res.status(200).send({ data: { message: message, rows: checkUpdate.rows } })
        }
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.deleteParturitionByID = async (req, res) => {

    try {
        const parturition_id = req.body.parturition_id
        message = "Cannot Delete parturition"

        if (parturition_id.length == 0 || null) {
            message = "Please Fill Parturition ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const findByID = await pool.query(`SELECT * FROM parturition WHERE parturition_id = ` + parturition_id)

        if (findByID.rows.length == 0 || null) {
            message = "Don't have parturition ID " + parturition_id;
            return res.status(500).send({ data: { message: message } })
        } else {
            const ret = await pool.query(`DELETE FROM parturition WHERE parturition_id = $1`, [parturition_id]);
            message = "Parturition Deleted :)"
            console.log(message);
            return res.status(200).send({ data: { message: message } })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })

}