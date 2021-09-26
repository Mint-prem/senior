const pool = require(`../database/pool`);

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
        const AllMilk = await pool.query(`SELECT * FROM   
        milks WHERE milk_date BETWEEN '2021-09-02' and '2021-09-30'`);
        message = "Sussess :)"
        console.log(message);
        const countMilk = await pool.query(`SELECT total FROM   
        milks WHERE milk_date BETWEEN '2021-09-02' and '2021-09-30'`);
        console.log(countMilk.rows)
        total = 0
        cal = countMilk.rows
        for (var i = 0; i < countMilk.rows.length; i++) {
            total += cal[i].total;
        }
        console.log(total)
        return res.status(200).send({ data: { rows: AllMilk.rows, milk: total } })
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    return res.status(500).send({ data: { message: message } });

}

exports.getAllMilkYear = async (req, res) => {

    try {
        //ต้อง request farm id ด้วย

        const getYear = await pool.query(`SELECT date_part('year', now()) AS "year";`)
        const year = getYear.rows[0].year
        console.log(year)


        const countTotalMilk = await pool.query(
            `SELECT SUM(total) AS "total"
            FROM milks WHERE date_part('year', milk_date) = date_part('year', CURRENT_DATE)
            GROUP BY (SELECT EXTRACT(YEAR FROM milk_date));`);
        const total = countTotalMilk.rows[0].total;
        console.log(total)

        const getAllMilkbyMonthofYear = await pool.query(
            `SELECT (SELECT EXTRACT(MONTH FROM milk_date) AS "month"), COUNT(total)
            FROM milks WHERE date_part('year', milk_date) = date_part('year', CURRENT_DATE)
            GROUP BY (SELECT EXTRACT(MONTH FROM milk_date) AS "month");`);
        console.log(getAllMilkbyMonthofYear.rows)


        message = "Sussess :)"
        console.log(message);

        return res.status(200).send({ data: {  year: year, total: total, rows: getAllMilkbyMonthofYear.rows} })
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    return res.status(500).send({ data: { message: message } });

}

exports.getMilkByID = async (req, res) => {

    try {
        const milk_id = req.body.milk_id
        message = "Method Error"

        if (milk_id.length == 0 || null) {
            message = "Please Fill Milk ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const MilkByID = await pool.query("SELECT * FROM milks WHERE milk_id = $1", [milk_id]);
        if (MilkByID.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: MilkByID.rows } })
        } else {
            ret.message = ("Don't have milk ID " + milk_id);
            return res.status(500).send({ data: { message: message } })
        }
    } catch (err) {
        ret.message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

exports.getMilkByID = async (req, res) => {

    try {
        const milk_id = req.body.milk_id
        message = "Method Error"

        if (milk_id.length == 0 || null) {
            message = "Please Fill Milk ID"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const MilkByID = await pool.query("SELECT * FROM milks WHERE milk_id = $1", [milk_id]);
        if (MilkByID.rows.length != 0) {
            message = "Sussess :)"
            console.log(message);
            return res.status(200).send({ data: { rows: MilkByID.rows } })
        } else {
            message = ("Don't have milk ID " + milk_id);
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
        message = "Method Error"

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
    } catch (err) {
        message = "Error";
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } });
}

// exports.getMilkByCowID = async (req, res) => {

//     try {
//         const milk_id = req.body.milk_id
//         message = "Method Error"

//         if (milk_id.length == 0 || null) {
//             message = "Please Fill Milk ID"
//             console.log(message)
//             return res.status(500).send({ data: { message: message } })
//         }

//         const MilkByID = await pool.query("SELECT * FROM milks WHERE milk_id = $1", [milk_id]);
//         if (MilkByID.rows.length != 0) {
//             message = "Sussess :)"
//             console.log(message);
//             return res.status(200).send({ data: { rows: MilkByID.rows } })
//         } else {
//             message = ("Don't have milk ID " + milk_id);
//             return res.status(500).send({ data: { message: message } })
//         }
//     } catch (err) {
//         message = "Error";
//         console.error(err.message);
//     }
//     return res.status(500).send({ data: { message: message } });
// }


exports.addNewMilk = async (req, res) => {

    try {
        message = "Cannot create new milk"

        const addMilk = await pool.query(`INSERT INTO milk (milk_litermorn, milkliter_even, date_milk, total, farm_id) values ($1,$2,$3,$4,$5)`,
            [json.milk_litermorn, json.milkliter_even, json.date_milk, json.total, json.farm_id]);
        message = "Milk Created :)"
        console.log(ret.message);
        return message;
    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return message;
}

exports.updateMilkByID = async (id, json) => {
    let ret = {}
    ret.message = "Cannot update milk"
    const findByID = await pool.query(`SELECT * FROM milk WHERE milk_id = ` + id)

    if (findByID.rows.length == 0 || null) {
        ret.message = "Don't have milk ID " + id;
        return ret.message;
    } else {
        try {
            const ret = await pool.query(`UPDATE milk SET milk_litermorn = $1, milk_litereven = $2, date_milk = $3, total = $4, farm_id = $5 WHERE milk_id = $6`,
                [json.milk_litermorn, json.milkliter_even, json.date_milk, json.total, json.farm_id, id]);
            ret.message = "Milk Updated :)"
            console.log(ret.message);
            return ret.message;
        } catch (err) {
            ret.message = "Error"
            console.error(err.message);
        }
    }

    return ret.message;
}

exports.deleteMilkByID = async (id) => {
    let ret = {}
    ret.message = "Cannot Delete milk"
    const findByID = await pool.query(`SELECT * FROM milk WHERE milk_id = ` + id)

    if (findByID.rows.length == 0 || null) {
        ret.message = "Don't have milk ID " + id;
        return ret.message;
    } else {
        try {
            const ret = await pool.query(`DELETE FROM milk WHERE milk_id = $1`, [id]);
            ret.message = "Milk Deleted :)"
            console.log(ret.message);
            return ret.message;
        } catch (err) {
            ret.message = "Error"
            console.error(err.message);
        }
    }

    return ret.message;

}