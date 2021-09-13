const pool = require('../database/pool');


exports.getAllCow = async (req, res) => {
    let ret = {}
    ret.message = "Cannot get data"

    try {
        const ret = await pool.query(`SELECT * FROM cow`);
        res.status(200).send({ data: { cows: ret.rows } })
        console.log(ret.message);
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
}

exports.getCowsByUser = async (req, res) => {
    const farm_id = req.body.farm_id;

    try {
        const cows = await pool.query(`SELECT * FROM cow WHERE farm_id = $1`, [farm_id])

        if (cows.rows.length == 0 || null) {
            res.status(200).send({ data: { message: "You don't have cow" } })
        } else {
            res.status(200).send({ data: { cows: cows.rows } })
        }

    } catch (error) {
        res.status(500).send({ message: err })
        console.error(err)
    }
}

exports.getCowByID = async (id) => {
    let ret = {}
    ret.message = "Cannot get data"

    try {
        const ret = await pool.query("SELECT * FROM cow WHERE cow_id = $1", [id]);
        if (ret.rows.length != 0) {
            ret.message = "Sussess :)"
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message = ("Don't have cow ID " + id);
            return ret.message;
        }
    } catch (err) {
        ret.message = "Error";
        console.error(err.message);
    }
    return ret.message;
}

exports.addNewCow = async (json) => {
    let ret = {}
    ret.message = "Cannot create new cow"

    try {
        const ret = await pool.query(`INSERT INTO cow (cow_no, cow_name, cow_birthday, cow_sex, cow_image1, cow_image2, cow_image3, note, typecow_id, species_id, farm_id, statuscow_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
            [json.cow_no, json.cow_name, json.cow_birthday, json.cow_sex, json.cow_image1, json.cow_image2, json.cow_image3, json.note, json.typecow_id, json.species_id, json.farm_id, json.statuscow_id]);
        ret.message = "Cow Created :)"
        console.log(ret.message);
        return ret.message;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

exports.updateCowByID = async (id, json) => {
    let ret = {}
    ret.message = "Cannot update cow"
    const findByID = await pool.query(`SELECT * FROM cow WHERE cow_id = ` + id)

    if (findByID.rows.length == 0 || null) {
        ret.message = "Don't have cow ID " + id;
        return ret.message;
    } else {
        try {
            const ret = await pool.query(`UPDATE cow SET cow_no = $1, cow_name = $2, cow_birthday = $3, cow_sex = $4, cow_image1 = $5, cow_image2 = $6, cow_image3 = $7, note = $8, typecow_id = $9, species_id = $10, farm_id = $11, statuscow_id = $12 WHERE cow_id = $13`,
                [json.cow_no, json.cow_name, json.cow_birthday, json.cow_sex, json.cow_image1, json.cow_image2, json.cow_image3, json.note, json.typecow_id, json.species_id, json.farm_id, json.statuscow_id, id]);
            ret.message = "Cow Updated :)"
            console.log(ret.message);
            return ret.message;
        } catch (err) {
            ret.message = "Error"
            console.error(err.message);
        }
    }

    return ret.message;
}

exports.deleteCowByID = async (id) => {
    let ret = {}
    ret.message = "Cannot Delete cow"
    const findByID = await pool.query(`SELECT * FROM cow WHERE cow_id = ` + id)

    if (findByID.rows.length == 0 || null) {
        ret.message = "Don't have cow ID " + id;
        return ret.message;
    } else {
        try {
            const ret = await pool.query(`DELETE FROM cow WHERE cow_id = $1`, [id]);
            ret.message = "Cow Deleted :)"
            console.log(ret.message);
            return ret.message;
        } catch (err) {
            ret.message = "Error"
            console.error(err.message);
        }
    }

    return ret.message;

}
