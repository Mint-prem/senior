const e = require("cors");
const pool = require(`../database/pool`);
const farm = require("../routes/farm");

exports.getAllMilk = async (req, res) => {

    try {
        const AllMilk = await pool.query(`SELECT * FROM milks`);
        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { rows: AllMilk.rows } })
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    return res.status(500).send({ data: { message: message } });

}

exports.getAllMilkMonth = async (req, res) => {

    try {
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id
        const getYear = await pool.query(`SELECT date_part('year', now()) AS "year";`)
        const getMonth = await pool.query(`SELECT date_part('month', now()) AS "month";`)

        const year = getYear.rows[0].year
        const month = getMonth.rows[0].month

        if (user_id.length == 0 || null) {
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


        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            const AllMilk = await pool.query(
                `SELECT * FROM milks 
                    WHERE farm_id = $1 
                    AND milk_date BETWEEN (SELECT date_trunc('month', current_date)) AND CURRENT_DATE`, [farm_id]);
            message = "Sussess :)"
            console.log(message);

            const countTotalMilk = await pool.query(
                `SELECT SUM(total) AS total FROM  milks  
                    WHERE farm_id = $1 AND milk_date BETWEEN (SELECT date_trunc('month', current_date)) AND CURRENT_DATE`, [farm_id]);

            if (countTotalMilk.rows.length == 0) {
                total = 0;
            } else {
                total = countTotalMilk.rows[0].total
                console.log("total : " + total)
            }
            return res.status(200).send({ data: { total: total, rows: AllMilk.rows} })

        } else {
            message = "You are not a member in this farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });

}

exports.getAllMilkYear = async (req, res) => {


    try {
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id
        const getYear = await pool.query(`SELECT date_part('year', now()) AS "year";`)
        const getMonth = await pool.query(`SELECT date_part('month', now()) AS "month";`)

        const year = getYear.rows[0].year
        const month = getMonth.rows[0].month

        if (user_id.length == 0 || null) {
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


        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            const countTotalMilk = await pool.query(
                `SELECT SUM(total) AS "total"
                FROM milks WHERE farm_id = $1 AND date_part('year', milk_date) = date_part('year', CURRENT_DATE)
                GROUP BY (SELECT EXTRACT(YEAR FROM milk_date)), farm_id`, [farm_id]);

            if (countTotalMilk.rows.length == 0) {
                total = 0;
            } else {
                total = countTotalMilk.rows[0].total
                console.log("total : " + total)
            }

            const getAllMilkbyMonthofYear = await pool.query(
                `SELECT (SELECT EXTRACT(MONTH FROM milk_date) AS "month"), SUM(total)
                    FROM milks WHERE farm_id = $1 AND date_part('year', milk_date) = date_part('year', CURRENT_DATE)
                    GROUP BY (SELECT EXTRACT(MONTH FROM milk_date) AS "month"), farm_id;`, [farm_id]);

            const milk = []
            for (let i = 0; i < month; i++) {
                let getMonth = getAllMilkbyMonthofYear.rows[i].month
                let getCount = getAllMilkbyMonthofYear.rows[i].sum
                var months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
                "พฤษภาคม ", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
                "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
                let month = months[i]
                milk[i] = { month: month, sum: getCount }
            }

            message = "Sussess :)"
            console.log(milk)
            console.log(message);
            return res.status(200).send({ data: { year: year, total: total, rows: milk } })

        } else {
            message = "You are not a member in this farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}



exports.getMilkByID = async (req, res) => {

    try {
        const milk_id = req.body.milk_id
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id
        message = "Method Error"

        if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (milk_id.length == 0 || null) {
            message = "Please Fill Milk ID"
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

            const MilkByID = await pool.query("SELECT * FROM milks WHERE milk_id = $1 AND farm_id = $2", [milk_id, farm_id]);
            if (MilkByID.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { rows: MilkByID.rows } })
            } else {
                message = ("Don't have milk ID " + milk_id + " in farm ID " + farm_id);
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
    return res.status(500).send({ data: { message: message } });
}

exports.getMilkByFarmID = async (req, res) => {

    try {
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id
        message = "Method Error"


        if (user_id.length == 0 || null) {
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


        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            const MilkByID = await pool.query(`SELECT * FROM milks WHERE farm_id = $1`, [farm_id]);

            if (MilkByID.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { rows: MilkByID.rows } })
            } else {
                message = "Don't have milk data in farm";
                console.log(message)
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
    return res.status(500).send({ data: { message: message } });
}

exports.addNewMilk = async (req, res) => {

    try {
        const milk_liter_morn = req.body.milk_liter_morn
        const milk_liter_even = req.body.milk_liter_even
        const milk_date = req.body.milk_date
        const total = req.body.total
        message = "Cannot create new milk"

        const farm_id = req.body.farm_id
        const user_id = req.body.user_id


        if (user_id.length == 0 || null) {
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


        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            const addMilk = await pool.query(`INSERT INTO milks (farm_id, milk_liter_morn, milk_liter_even, milk_date, total) values ($1,$2,$3,$4,$5)`,
                [farm_id, milk_liter_morn, milk_liter_even, milk_date, total]);
            message = "Milk Created :)"
            const checkMilk = await pool.query(`SELECT * FROM milks WHERE farm_id = $1 AND milk_date = $2 ORDER BY milk_id DESC`, [farm_id, milk_date])
            console.log(message)
            return res.status(200).send({ data: { message: message, rows: checkMilk.rows[0]} });

        } else {
            message = "You are not a member in this farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

exports.updateMilkByID = async (req, res) => {

    try {
        const milk_id = req.body.milk_id
        const milk_liter_morn = req.body.milk_liter_morn
        const milk_liter_even = req.body.milk_liter_even
        const milk_date = req.body.milk_date
        const total = req.body.total
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id
        message = "Cannot update milk"

        if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (milk_id.length == 0 || null) {
            message = "Please Fill Milk ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])
        const findByID = await pool.query(`SELECT * FROM milks WHERE milk_id = ` + milk_id)


        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            if (findByID.rows.length == 0 || null) {
                message = "Don't have milk ID " + id;
                return res.status(500).send({ data: { message: message } });
            }

            const updateMilk = await pool.query(`UPDATE milks SET farm_id = $1, milk_liter_morn = $2, milk_liter_even = $3, milk_date = $4, total = $5 WHERE milk_id = $6`,
                [farm_id, milk_liter_morn, milk_liter_even, milk_date, total, milk_id]);
            message = "Milk Updated :)"

            const checkUpdate = await pool.query(`SELECT * FROM milks WHERE milk_id = $1 AND farm_id = $2`, [milk_id, farm_id])
            console.log(message);
            return res.status(200).send({ data: { message: message, rows: checkUpdate.rows } });

        } else {
            message = "You are not a member in this farm"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    return res.status(500).send({ data: { message: message } });
}

exports.deleteMilkByID = async (req, res) => {

    try {
        const milk_id = req.body.milk_id
        const farm_id = req.body.farm_id
        const user_id = req.body.user_id

        if (user_id.length == 0 || null) {
            message = "Please Fill User ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (farm_id.length == 0 || null) {
            message = "Please Fill Farm ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (milk_id.length == 0 || null) {
            message = "Please Fill Milk ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])
        const findByID = await pool.query(`SELECT * FROM milk WHERE milk_id = ` + milk_id)

        if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findByID.rows.length == 0 || null) {
            message = "Don't have milk ID " + id;
            return res.status(500).send({ data: { message: message } });
        } else if (checkMember.rows.length != 0) {

            if (checkMember.rows[0].role_id == 1) {
                const deleteMilk = await pool.query(`DELETE FROM milk WHERE milk_id = $1`, [id]);
                message = "Milk Deleted :)"
                console.log(message);
                return res.status(200).send({ data: { message: message } });

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
    return res.status(500).send({ data: { message: message } });

}