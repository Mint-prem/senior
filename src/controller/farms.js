const pool = require('../database/pool')

exports.getAllFarm = async (req, res) => {

    try {
        const getAllFarm = await pool.query(`SELECT * FROM farms`);
        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { count: getAllFarm.rowCount, rows: getAllFarm.rows } })

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

exports.getFarmByID = async (req, res) => {

    try {

        if (req.body.farm_id.length == 0 || undefined) {
            message = "Farm ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const farm_id = req.body.farm_id

        const getFarm = await pool.query("SELECT * FROM farms WHERE farm_id = $1", [farm_id]);

        if (getFarm.rows.length != 0) {
            const getCountCow = await pool.query('select count(cow_id) from cows where farm_id = $1', [farm_id])
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: getFarm.rows, cow: getCountCow.rows } })
        } else {
            message = ("Don't have farm ID " + farm_id);
            return res.status(500).send({ data: { message: message } });
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

exports.getFarmByUserID = async (req, res) => {

    try {

        if (req.body.user_id.length == 0 || undefined) {
            message = "User ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const user_id = req.body.user_id

        const checkHaveUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])

        if (checkHaveUser.rows.length == 0) {
            message = "Don't have user ID: " + user_id
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const getWorker = await pool.query("SELECT * FROM workers WHERE user_id = $1", [user_id]);

        if (getWorker.rows.length != 0) {
            const farm_id = getWorker.rows[0].farm_id

            const getFarm = await pool.query("SELECT * FROM farms WHERE farm_id = $1", [farm_id]);
            const getCountCow = await pool.query('select count(cow_id) from cows where farm_id = $1', [farm_id])
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: getFarm.rows, cow: getCountCow.rows } })

        } else {
            message = ("User don't have farm");
            return res.status(500).send({ data: { message: message } });
        }
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

exports.getFarmByCode = async (req, res) => {

    try {

        if (req.body.farm_code.length == 0 || undefined) {
            message = "Farm code is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        let farm_code = req.body.farm_code
        message = "Method Error"

        const findFarmByCode = await pool.query("SELECT * FROM farms WHERE farm_code = $1", [farm_code]);

        if (findFarmByCode.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: findFarmByCode.rows } })
        } else {
            message = ("Don't have farm code : " + farm_code);
            return res.status(500).send({ data: { message: message } })
        }

    } catch (err) {
        message = "Error";
        console.error(err.message);
    }

    return res.status(500).send({ data: { message: message } })
}

exports.addNewFarm = async (req, res) => {

    try {

        if (req.body.user_id.length == 0 || undefined) {
            message = "User ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.farm_no.length == 0 || undefined) {
            message = "Farm no is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.farm_name.length == 0 || undefined) {
            message = "Farm name is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.farm_code.length == 0 || undefined) {
            message = "Farm code is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const user_id = req.body.user_id;
        let farm_name = req.body.farm_name;
        let farm_no = req.body.farm_no;
        let address = req.body.address;
        let moo = req.body.moo;
        let soi = req.body.soi;
        let road = req.body.road;
        let sub_district = req.body.sub_district;
        let district = req.body.district;
        let province = req.body.province;
        let postcode = req.body.postcode;
        const farm_code = req.body.farm_code;
        let farm_image = req.body.farm_image;

        message = "Method Error"

        const checkHaveUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const checkUserHaveFarm = await pool.query(`SELECT * FROM workers WHERE user_id = $1`, [user_id]);


        if (checkHaveUser.rows.length == 0) {
            message = "Don't have user ID: " + user_id
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkUserHaveFarm.rows.length != 0) {
            message = "User already have Farm!!"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkFarmNo = await pool.query(`SELECT * FROM farms WHERE farm_no = $1`, [farm_no])
        const checkFarmCode = await pool.query(`SELECT * FROM farms WHERE farm_code = $1`, [farm_code])

        if (checkFarmNo.rows.length != 0) {
            message = "เลขทะเบียนฟาร์มนี้ถูกใช้งานแล้ว กรุณาตั้งใหม่"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkFarmCode.rows.length != 0) {
            message = "ไอดีฟาร์มนี้ถูกใช้งานแล้ว กรุณาตั้งใหม่"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const date = new Date();
        var startwork = date.toISOString();

        const farm = await pool.query(`INSERT INTO farms (farm_no, farm_code, farm_name, farm_image, address, moo, soi, road, sub_district, district, province, postcode) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
            [farm_no, farm_code, farm_name, farm_image, address, moo, soi, road, sub_district, district, province, postcode]);
        message = "Farm Created :)"

        const checkNewFarm = await pool.query(`SELECT * FROM farms WHERE farm_name = $1 AND farm_code = $2`, [farm_name, farm_code])

        if (checkNewFarm.rows.length == 0 || null) {
            message = "ไม่สามารถสร้างฟาร์มได้"
            console.log(message)
            return res.status(500).send({ data: { message: message } })

        } else {
            console.log(message);
            const farm_id = checkNewFarm.rows[0].farm_id
            const worker = await pool.query(`INSERT INTO workers (role_id, farm_id, user_id, startwork) values ($1,$2,$3,$4)`,
                [1, farm_id, user_id, startwork]);

            const checkOwnerAdded = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])

            if (checkOwnerAdded.rows.length != 0) {
                message = "Farm Created & Owner Added :)"
                console.log(message)
                return res.status(200).send({ data: { message: message, rows: checkNewFarm.rows, owner: checkOwnerAdded.rows } });
            } else {
                message = "สร้างฟาร์มสำเร็จ แต่ไม่สามารถเพิ่มเข้าระบบเป็นเจ้าของฟาร์มได้"
                console.log(message)
                return res.status(500).send({ data: { message: message } })
            }
        }

    } catch (error) {
        message = "Error"
        console.log(error.message)
    }
    return res.status(500).send({ data: { message: message } })
}

exports.checkFarm = async (req, res) => {

    try {

        if (req.body.user_id.length == 0 || undefined) {
            message = "User ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const user_id = req.body.user_id;

        const account = await pool.query(`SELECT * FROM users u 
        JOIN workers w ON u.user_id = w.user_id 
        JOIN roles r ON r.role_id = w.role_id 
        JOIN farms f ON f.farm_id = w.farm_id WHERE w.user_id = $1`, [user_id]);

        if (account.rows.length == 0 || null) {

            const join = await pool.query(`SELECT * FROM users u JOIN join_farm j ON j.user_id = u.user_id 
            WHERE u.user_id = $1`, [user_id])

            if (join.rows.length == 0 || null) {

                const user = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id]);

                if (user.rows.length == 0 || null) {
                    return res.status(500).send({ data: { message: "ไม่พบข้อมูล" } });
                } else {
                    console.log('B')
                    return res.status(200).send({ data: { message: 'B', rows: user.rows } });
                }

            } else {
                console.log('C')
                return res.status(200).send({ data: { message: 'C', rows: join.rows } });
            }

        } else if (account.rows[0].role_id == 1) {
            console.log('A')
            return res.status(200).send({ data: { message: 'A', rows: account.rows } });

        } else if (account.rows[0].role_id == 2) {
            console.log('D')
            return res.status(200).send({ data: { message: 'D', rows: account.rows } });

        }
        else {
            console.log('Bug')
            return res.status(200).send({ data: { message: 'Bug Check' } });
        }

    } catch (err) {
        message = "Error"
        console.log(err.message)
    }
    console.log('Bug')
    return res.status(500).send({ data: { message: message } })
}

exports.updateFarm = async (req, res) => {

    try {

        if (req.body.user_id.length == 0 || undefined) {
            message = "User ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.farm_id.length == 0 || undefined) {
            message = "Farm ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.farm_no.length == 0 || undefined) {
            message = "Farm no is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.farm_name.length == 0 || undefined) {
            message = "Farm name is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.farm_code.length == 0 || undefined) {
            message = "Farm code is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

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

        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])

        if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })

        } else if (checkMember.rows.length != 0) {
            if (checkMember.rows[0].role_id == 1) {

                const editFarm = await pool.query(`UPDATE farms SET farm_no = $1, farm_code = $2, farm_name = $3, farm_image = $4, address = $5, moo = $6, soi = $7, road = $8, sub_district = $9, district = $10, province = $11, postcode = $12 WHERE farm_id = $13`,
                    [farm_no, farm_code, farm_name, farm_image, address, moo, soi, road, sub_district, district, province, postcode, farm_id]);
                const check = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
                message = "Farm Updated :)"
                console.log(message);
                return res.status(200).send({ data: { message: message, rows: check.rows } })
            } else {
                message = "You don't have permission to update!!"
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

exports.deleteFarm = async (req, res) => {

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

        let farm_id = req.body.farm_id
        let user_id = req.body.user_id

        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])

        if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })

        } else if (checkMember.rows.length != 0) {

            if (checkMember.rows[0].role_id == 1) {
                const deleteFarm = await pool.query(`DELETE FROM farms WHERE farm_id = $1`, [farm_id]);
                message = "Farm Deleted :)"
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