const e = require("express");
const pool = require(`../database/pool`);

setDate = [{
    firstHeat: 21,
    secondHeat: 42,
    thirdHeat: 63,
    dryDate: 225,
    ParDate: 285
}]

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    if (diffInDays < 0) {
        return "F";
    }

    return diffInDays;
}

exports.getAllabdominal = async (req, res) => {

    try {
        const getAllAb = await pool.query(`SELECT * FROM abdominal a join 
    cows c on a.cow_id = c.cow_id`);
        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { rows: getAllAb.rows } })

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.getAbdominalByID = async (req, res) => {

    try {

        if (req.body.farm_id.length == 0 || undefined || null) {
            message = "Farm ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.user_id.length == 0 || undefined) {
            message = "User ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.abdominal_id.length == 0 || undefined) {
            message = "Abdominal ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const abdominal_id = req.body.abdominal_id
        const user_id = req.body.user_id
        const farm_id = req.body.farm_id
        message = "Method Error"

        console.log(user_id)
        console.log(farm_id)
        console.log(abdominal_id)


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

            const getAbByID = await pool.query("SELECT * FROM abdominal a LEFT JOIN cows c ON a.cow_id = c.cow_id WHERE a.abdominal_id = $1 AND c.farm_id = $2", [abdominal_id, farm_id]);
            if (getAbByID.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { rows: getAbByID.rows } })
            } else {
                message = ("Don't have abdominal ID " + abdominal_id + " in farm ID " + farm_id);
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

exports.getAbdominalByFarmID = async (req, res) => {

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

        const user_id = req.body.user_id
        const farm_id = req.body.farm_id
        message = "Method Error"

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

            const getAbByFarmID = await pool.query(
                `SELECT * FROM abdominal a
                INNER JOIN cows c ON c.cow_id = a.cow_id
                WHERE c.farm_id = $1`, [farm_id]);

            if (getAbByFarmID.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, rows: getAbByFarmID.rows } })
            } else {
                message = ("Don't have abdominal data in farm");
                return res.status(200).send({ data: { ment: 2, message: message } })
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

exports.getAbdominalByCowID = async (req, res) => {

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
        const user_id = req.body.user_id;
        const farm_id = req.body.farm_id;
        message = "Method Error"

        const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])
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
        } else if (checkCow.rows.length == 0 || null) {
            message = "Don't have cow ID: " + cow_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            const getAbByCowID = await pool.query("SELECT * FROM abdominal a join cows c on a.cow_id = c.cow_id WHERE a.cow_id = $1 ORDER BY ab_date DESC", [cow_id]);
            if (getAbByCowID.rows.length != 0) {
                getCount = await pool.query(`SELECT COUNT(*) FROM abdominal a join cows c on a.cow_id = c.cow_id WHERE a.cow_id = $1`, [cow_id])
                count = getCount.rows[0].count

                setAb = []

                abDate = getAbByCowID.rows[0].ab_date

                firstHeat = addDays(abDate, setDate[0].firstHeat);
                secondHeat = addDays(abDate, setDate[0].secondHeat);
                thirdHeat = addDays(abDate, setDate[0].thirdHeat);
                dryDate = addDays(abDate, setDate[0].dryDate);
                parDate = addDays(abDate, setDate[0].ParDate);

                //console.log(abDate + '\n' + firstHeat + '\n' + secondHeat + '\n' + thirdHeat + '\n' + dryDate + '\n' + parDate)

                const date = new Date();
                var currentDate = date.toISOString();

                setAb[0] =
                {
                    firstHeat: firstHeat, firstcount: getNumberOfDays(currentDate, firstHeat),
                    secondHeat: secondHeat, secondcount: getNumberOfDays(currentDate, secondHeat),
                    thirdHeat: thirdHeat, thirdcount: getNumberOfDays(currentDate, thirdHeat),
                    dryDate: dryDate, drycount: getNumberOfDays(currentDate, dryDate),
                    parDate: parDate, parcount: getNumberOfDays(currentDate, parDate)
                }
                console.log(setAb)


                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, count: count, rows: getAbByCowID.rows[0], date: setAb} })
            } else {
                count = 0
                message = "Cow id " + cow_id + " don't have abdominal data";
                return res.status(200).send({ data: { ment: 2, count: count, message: message } })
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

exports.getManyAbdominalByCowID = async (req, res) => {

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
        const user_id = req.body.user_id;
        const farm_id = req.body.farm_id;
        message = "Method Error"

        const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])
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
        } else if (checkCow.rows.length == 0 || null) {
            message = "Don't have cow ID: " + cow_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            const getAbByCowID = await pool.query("SELECT * FROM abdominal a join cows c on a.cow_id = c.cow_id WHERE a.cow_id = $1", [cow_id]);

            if (getAbByCowID.rows.length != 0) {

                setAb = []

                getAbByCowID.rows.forEach((member, index) => {
                    console.log("In function")

                    abDate = getAbByCowID.rows[index].ab_date

                    firstHeat = addDays(abDate, setDate[0].firstHeat);
                    secondHeat = addDays(abDate, setDate[0].secondHeat);
                    thirdHeat = addDays(abDate, setDate[0].thirdHeat);
                    dryDate = addDays(abDate, setDate[0].dryDate);
                    parDate = addDays(abDate, setDate[0].ParDate);

                    //console.log(abDate + '\n' + firstHeat + '\n' + secondHeat + '\n' + thirdHeat + '\n' + dryDate + '\n' + parDate)

                    const date = new Date();
                    var currentDate = date.toISOString();

                    setAb[index] =
                    {
                        firstHeat: firstHeat, firstcount: getNumberOfDays(currentDate, firstHeat),
                        secondHeat: secondHeat, secondcount: getNumberOfDays(currentDate, secondHeat),
                        thirdHeat: thirdHeat, thirdcount: getNumberOfDays(currentDate, thirdHeat),
                        dryDate: dryDate, drycount: getNumberOfDays(currentDate, dryDate),
                        parDate: parDate, parcount: getNumberOfDays(currentDate, parDate)
                    }
                    console.log(setAb)
                });

                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, rows: getAbByCowID.rows, date: setAb } })
            } else {
                message = "Cow id " + cow_id + " don't have abdominal data";
                return res.status(200).send({ data: { ment: 2, message: message } })
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

exports.addNewAbdominal = async (req, res) => {

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
        const round = req.body.round
        const ab_date = req.body.ab_date
        const ab_status = req.body.ab_status
        const ab_caretaker = req.body.ab_caretaker
        const semen_id = req.body.semen_id
        const semen_name = req.body.semen_name
        const semen_specie = req.body.semen_specie
        const ab_calf = req.body.ab_calf
        const note = req.body.note

        const user_id = req.body.user_id;
        const farm_id = req.body.farm_id

        const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])
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
        } else if (checkCow.rows.length == 0 || null) {
            message = "Don't have cow ID: " + cow_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            const AddNew = await pool.query(`INSERT INTO abdominal (cow_id, round, ab_date, ab_status, ab_caretaker, semen_id, semen_name, semen_specie, ab_calf, note) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                [cow_id, round, ab_date, ab_status, ab_caretaker, semen_id, semen_name, semen_specie, ab_calf, note]);
            const CheckAdd = await pool.query(`SELECT * FROM abdominal WHERE cow_id = $1 AND round = $2 ORDER BY abdominal_id DESC`, [cow_id, round])
            if (CheckAdd.rows.length != 0) {
                message = "Abdominal Created :)"
                console.log(message)
                return res.status(200).send({ data: { message: message, rows: CheckAdd.rows[0] } })
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

exports.updateAbdominalByID = async (req, res) => {

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
        } else if (req.body.abdominal_id.length == 0 || undefined) {
            message = "Abdominal ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const abdominal_id = req.body.abdominal_id
        const cow_id = req.body.cow_id
        const round = req.body.round
        const ab_date = req.body.ab_date
        const ab_status = req.body.ab_status
        const ab_caretaker = req.body.ab_caretaker
        const semen_id = req.body.semen_id
        const semen_name = req.body.semen_name
        const semen_specie = req.body.semen_specie
        const ab_calf = req.body.ab_calf
        const note = req.body.note

        const user_id = req.body.user_id;
        const farm_id = req.body.farm_id

        const checkAbID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1`, [abdominal_id])
        const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])
        const checkUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
        const findFarmByID = await pool.query(`SELECT * FROM farms WHERE farm_id = $1`, [farm_id])
        const checkMember = await pool.query(`SELECT * FROM workers WHERE user_id = $1 AND farm_id = $2`, [user_id, farm_id])

        if (checkAbID.rows.length == 0 || null) {
            message = "Don't have abdominal ID " + abdominal_id;
            return res.status(500).send({ data: { message: message } })
        } else if (checkCow.rows.length == 0 || null) {
            message = "Don't have cow ID: " + cow_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkUser.rows.length == 0 || null) {
            message = "Don't have User ID " + user_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (findFarmByID.rows.length == 0 || null) {
            message = "Don't have farm ID " + farm_id;
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkMember.rows.length != 0) {

            const findByID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1`, [abdominal_id])
            const ret = await pool.query(`UPDATE abdominal SET cow_id = $1, round = $2, ab_date = $3, ab_status = $4, ab_caretaker = $5, semen_id = $6, semen_name = $7, semen_specie = $8, ab_calf = $9, note = $10 WHERE abdominal_id = $11`,
                [cow_id, round, ab_date, ab_status, ab_caretaker, semen_id, semen_name, semen_specie, ab_calf, note, abdominal_id]);

            const checkUpdate = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1 `, [abdominal_id])

            if (checkUpdate.rows.length != 0) {
                message = "Abdominal Updated :)"
                console.log(message);
                return res.status(200).send({ data: { message: message, rows: checkUpdate.rows } })
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

exports.deleteAbdominalByID = async (req, res) => {

    try {

        if (req.body.farm_id.length == 0 || undefined) {
            message = "Farm ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.user_id.length == 0 || undefined) {
            message = "User ID  is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (req.body.abdominal_id.length == 0 || undefined) {
            message = "Abdominal ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        let user_id = req.body.user_id
        let farm_id = req.body.farm_id
        let abdominal_id = req.body.abdominal_id

        const checkAbID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1`, [abdominal_id])
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
        } else if (checkAbID.rows.length == 0 || null) {
            message = "Don't have abdominal ID " + abdominal_id;
            return res.status(500).send({ data: { message: message } })

        } else if (checkMember.rows.length != 0) {

            if (checkMember.rows[0].role_id == 1) {
                const delAb = await pool.query(`DELETE FROM abdominal WHERE abdominal_id = $1`, [abdominal_id]);
                message = "Abdominal Deleted :)"
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