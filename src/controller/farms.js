const pool = require('../database/pool')

exports.getAllFarm = async (req, res) => {

    try {
        let message = "Method Error"
        const getAllFarm = await pool.query(`SELECT * FROM farm`);
        message = "Sussess :)"
        console.log(message);
        res.status(200).send({ data: { count: getAllFarm.rowCount, rows: getAllFarm.rows } })

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    res.status(500).send({ data: { message: message } });
}

exports.getFarmByID = async (req, res) => {

    try {
        let message = "Method Error"
        let farm_id = req.body.farm_id

        if (id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            res.status(500).send({ data: { message: message } })
        }

        const getFarm = await pool.query("SELECT * FROM farm WHERE farm_id = $1", [farm_id]);

        if (getFarm.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            res.status(200).send({ data: { rows: getFarm.rows } })
        } else {
            message = ("Don't have farm ID " + farm_id);
            res.status(500).send({ data: { message: message } });
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    res.status(500).send({ data: { message: message } });
}

exports.getFarmByCode = async (req, res) => {

    try {
        let code = req.body.farm_code
        message = "Method Error"

        if (code.length == 0 || null) {
            message = "Please Fill Farm Code"
            console.log(message)
            res.status(500).send({ data: { message: message } })
        }

        const findFarmByCode = await pool.query("SELECT * FROM farm WHERE farm_code = $1", [code]);

        if (findFarmByCode.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            res.status(200).send({ data: { rows: findFarmByCode.rows } })
        } else {
            message = ("Don't have farm code : " + code);
            res.status(500).send({ data: { message: message } })
        }

    } catch (err) {
        message = "Error";
        console.error(err.message);
    }

    res.status(500).send({ data: { message: message } })
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

exports.updateFarm = async (req, res) => {

    try {
        const farm_id = req.body.farm_id;
        let farm_no = req.body.farm_no;
        let farm_name = req.body.farm_name;
        let farm_image = req.body.farm_image;
        const farm_code = req.body.farm_code;
        let address = req.body.address;
        let moo = req.body.moo;
        let soi = req.body.soi;
        let road = req.body.road;
        let sub_district = req.body.sub_district;
        let district = req.body.district;
        let province = req.body.province;
        let postcode = req.body.postcode;
        const user_id = req.body.user_id;

        message = "Method Error"

        //Fill Farm ID
        if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            res.status(500).send({ data: { message: message } })
        }

        //Fill User ID
        if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            res.status(500).send({ data: { message: message } })
        }

        const findByID = await pool.query(`SELECT * FROM farm WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM worker WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])

        //Check ID Farm
        if (findByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            res.status(500).send({ message: message })

            //Check Member in Farm
        } else if (checkMember.rows.length == 0 || null) {
            message = "You are not a member in this farm"
            console.log(message)
            res.status(500).send({ message: message })

            //Check Permission in Farm
        } else if (checkMember.rows[0].role_id == 1) {
            const editFarm = await pool.query(`UPDATE farm SET farm_no = $1, farm_name = $2, farm_image = $3, farm_code = $4, address = $5, moo = $6, soi = $7, road = $8, sub_district = $9, district = $10, province = $11, postcode = $12 WHERE farm_id = $13`,
                [farm_no, farm_name, farm_image, farm_code, address, moo, soi, road, sub_district, district, province, postcode, farm_id]);
            const check = await pool.query(`SELECT * FROM farm WHERE farm_id = $1`, [farm_id])
            message = "Farm Updated :)"
            console.log(message);
            res.status(200).send({ message: message, rows: check.rows })

            //Don't have Permission
        } else {
            message = "You don't have permission to update!!"
            console.log(message)
            res.status(500).send({ message: message })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
        res.status(500).send({ message: message })
    }

    res.status(500).send({ message: message })
}

exports.deleteFarm = async (req, res) => {

    try {
        let farm_id = req.body.farm_id
        let user_id = req.body.user_id
        message = "Method Error"

        //Fill Farm ID
        if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            res.status(500).send({ data: { message: message } })
        }

        //Fill User ID
        if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            res.status(500).send({ data: { message: message } })
        }

        console.log("Farm ID : " + farm_id)
        console.log("User ID : " + user_id)

        const findByID = await pool.query(`SELECT * FROM farm WHERE farm_id = $1`, [farm_id])
        const checkUser = await pool.query(`SELECT * FROM userdairy WHERE user_id = $1`, [user_id])
        const checkMember = await pool.query(`SELECT * FROM worker WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])

        //Check ID Farm
        if (findByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            res.status(500).send({ message: message })
        }

        //Check ID User
        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            res.status(500).send({ message: message })
        }

        //Check Members in Farm
        if (checkMember.rows.length == 0 || null) {
            message = "You are not a member in this farm"
            console.log(message)
            res.status(500).send({ message: message })

            //Check Permission in Farm
        } else if (checkMember.rows[0].role_id == 1) {
            const ret = await pool.query(`DELETE FROM farm WHERE farm_id = $1`, [farm_id]);
            message = "Farm Deleted :)"
            console.log(message);
            res.status(200).send({ message: message })

            //Don't have Permission
        } else {
            message = "You don't have permission to delete!!"
            console.log(message)
            res.status(500).send({ message: message })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    res.status(500).send({ message: message })
}