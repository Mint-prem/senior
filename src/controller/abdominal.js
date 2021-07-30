const pool = require(`../database/pool`);

const abdominal = {}

abdominal.getAllabdominal = async () => {
    let ret = {}
    ret.message = "Cannot get data!!"
    try {
        const ret = await pool.query(`SELECT * FROM abdominal`);
        ret.message = "Sussess :)"
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        console.error(err.message);
    }
}

abdominal.getAbdominalByID = async (id) => {
    let ret = {}
    ret.message = "Cannot get data"

    try {
        const ret = await pool.query("SELECT * FROM abdominal WHERE abdominal_id = $1", [id]);
        if (ret.rows.length != 0) {
            ret.message = "Sussess :)"
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message = ("Don't have abdominal ID " + id);
            return ret.message;
        }
    } catch (err) {
        console.error(err.message);
    }
    return ret.message;
}

abdominal.addNewAbdominal = async (json) => {
    let ret = {}
    ret.message = "Cannot create new abdominal"

    try {
        const ret = await pool.query(`INSERT INTO abdominal (round, ab_date, ab_status, ab_caretaker, dry_period, semen_id, semen_name, note, cow_id, semen_specie) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [json.round, json.ab_date, json.ab_status, json.ab_caretaker, json.dry_period, json.semen_id, json.semen_name, json.note, json.cow_id, json.semen_specie]);
        ret.message = "Abdominal Created :)"
        console.log(ret.message);
        return ret.message;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

abdominal.updateAbdominalByID = async (id, json) => {
    let ret = {}
    ret.message = "Cannot update abdominal"
    const findByID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = ` + id)

    if (findByID.rows.length == 0 || null) {
        ret.message = "Don't have abdominal ID " + id;
        return ret.message;
    } else {
        try {
            const ret = await pool.query(`UPDATE abdominal SET round = $1, ab_date = $2, ab_status = $3, ab_caretaker = $4, dry_period = $5, semen_id = $6, semen_name = $7, note = $8, cow_id = $9, semen_specie = $10 WHERE abdominal_id = $11`,
                [json.round, json.ab_date, json.ab_status, json.ab_caretaker, json.dry_period, json.semen_id, json.semen_name, json.note, json.cow_id, json.semen_specie, id]);
            ret.message = "Abdominal Updated :)"
            console.log(ret.message);
            return ret.message;
        } catch (err) {
            ret.message = "Error"
            console.error(err.message);
        }
    }

    return ret.message;
}

abdominal.deleteAbdominalByID = async (id) => {
    let ret = {}
    ret.message = "Cannot Delete Abdominal"
    const findByID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = ` + id)

    if (findByID.rows.length == 0 || null) {
        ret.message = "Don't have Abdominal ID " + id;
        return ret.message;
    } else {
        try {
            const ret = await pool.query(`DELETE FROM abdominal WHERE abdominal_id = $1`, [id]);
            ret.message = "Abdominal Deleted :)"
            console.log(ret.message);
            return ret.message;
        } catch (err) {
            ret.message = "Error"
            console.error(err.message);
        }
    }

    return ret.message;

}

module.exports = abdominal;