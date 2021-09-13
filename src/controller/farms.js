const pool = require('../database/pool')

exports.getAllFarm = async () => {
    let ret = {}
    ret.message = "Cannot get data"

    try {
        const ret = await pool.query(`SELECT * FROM farm`);
        ret.message = "Sussess :)"
        console.log(ret.message);
        return ret.rows;
    } catch (err) {
        ret.message = "Error"
        console.error(err.message);
    }
    return ret.message;
}

exports.getFarmByID = async (id) => {
    let ret = {}
    ret.message = "Cannot get data"

    try {
        const ret = await pool.query("SELECT * FROM farm WHERE farm_id = $1", [id]);
        if (ret.rows.length != 0) {
            ret.message = "Sussess :)"
            console.log(ret.message);
            return ret.rows;
        } else {
            ret.message = ("Don't have farm ID " + id);
            return ret.message;
        }
    } catch (err) {
        ret.message = "Error";
        console.error(err.message);
    }
    return ret.message;
}

exports.addNewFarm = async (req, res) => {
    const user_id = req.body.user_id;
    const farm_name = req.body.farm_name;
    const farm_no = req.body.farm_no;
    const address = req.body.address;
    const moo = req.body.moo;
    const soi = req.body.soi;
    const road = req.body.road;
    const sub_district = req.body.sub_district;
    const district = req.body.district;
    const province = req.body.province;
    const postcode = req.body.postcode;

    try {
        const d = new Date();
        var date_startwork = d.toISOString();
        const countF = await pool.query(`SELECT COUNT(farm_no) FROM farm`);
        var countFarm = parseInt(countF.rows[0].count);
        var intCountF = countFarm + 1;
        const countW = await pool.query(`SELECT COUNT(worker_id) FROM worker`);
        var countWorker = parseInt(countW.rows[0].count);
        var intCountW = countWorker + 1;

        const farm = await pool.query(`INSERT INTO farm (farm_id, farm_no, farm_name, farm_image, address, moo, soi, road, sub_district, district, province, postcode) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
            [intCountF, farm_no, farm_name, 1, address, moo, soi, road, sub_district, district, province, postcode]);

        const worker = await pool.query(`INSERT INTO worker (worker_id, role_id, farm_id, user_id, date_startwork, date_endwork) values ($1,$2,$3,$4,$5,$6)`,
            [intCountW, 1, intCountF, user_id, date_startwork, null]);

        const checkF = await pool.query(`SELECT COUNT(farm_no) FROM farm`);
        const checkW = await pool.query(`SELECT COUNT(worker_id) FROM worker`);

        if (countF != checkF && countW != checkW) {
            res.status(200).send({ data: { message: "Farm Created" } });
            console.log('Pass')
        } else if (account == check) {
            res.status(500).send({ message: "Cannot create farm" })
            console.log('Farm : ' + checkF + 'and Worker : ' + checkW + ' is Error')
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: err.message })
    }
}

exports.checkFarm = async (req, res) => {
    const user_id = req.body.user_id;

    try {
        const worker = await pool.query(`SELECT * FROM worker WHERE user_id = $1`, [user_id])

        if (worker.rows.length == 0 || null) {
            //doesn't have farm
            res.status(200).send({ data: { message: "A" } })
        } else {
            console.log('Have farm')
            res.status(200).send({ data: { message: "B" } })

        }

    } catch (error) {
        res.status(500).send({ message: err })
        console.log(err.message)
    }
}

exports.updateFarmByID = async (id, json) => {
    let ret = {}
    ret.message = "Cannot update farm"
    const findByID = await pool.query(`SELECT * FROM farm WHERE farm_id = ` + id)

    if (findByID.rows.length == 0 || null) {
        ret.message = "Don't have farm ID " + id;
        return ret.message;
    } else {
        try {
            const ret = await pool.query(`UPDATE farm SET farm_no = $1, farm_name = $2, farm_image = $3, address = $4, moo = $5, soi = $6, road = $7, sub_district = $8, district = $9, province = $10, postcode = $11 WHERE farm_id = $12`,
                [json.farm_no, json.farm_name, json.farm_image, json.address, json.moo, json.soi, json.road, json.sub_district, json.district, json.province, json.postcode, id]);
            ret.message = "Farm Updated :)"
            console.log(ret.message);
            return ret.message;
        } catch (err) {
            ret.message = "Error"
            console.error(err.message);
        }
    }

    return ret.message;
}

exports.deleteFarmByID = async (id) => {
    let ret = {}
    ret.message = "Cannot Farm cow"
    const findByID = await pool.query(`SELECT * FROM farm WHERE farm_id = ` + id)

    if (findByID.rows.length == 0 || null) {
        ret.message = "Don't have farm ID " + id;
        return ret.message;
    } else {
        try {
            const ret = await pool.query(`DELETE FROM farm WHERE farm_id = $1`, [id]);
            ret.message = "farm Deleted :)"
            console.log(ret.message);
            return ret.message;
        } catch (err) {
            ret.message = "Error"
            console.error(err.message);
        }
    }

    return ret.message;

}