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
        return -1;
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

exports.getCowByAbdominal = async (req, res) => {

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

            const getCowByAb = await pool.query(
                `SELECT DISTINCT c.cow_name, c.cow_id, c.cow_image, a.abdominal_id FROM abdominal a
                INNER JOIN cows c ON c.cow_id = a.cow_id
                WHERE a.ab_status = 'success' and a.ab_calf = 'f' and c.farm_id = $1`, [farm_id]);

            if (getCowByAb.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, rows: getCowByAb.rows } })
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

exports.getDistinctCowByFarmID = async (req, res) => {

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

        const farm_id = req.body.farm_id
        const user_id = req.body.user_id

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

            const getAbByFarm = await pool.query(
                `SELECT DISTINCT a.cow_id, c.cow_name, c.cow_no, c.cow_image FROM abdominal a
                JOIN cows c ON c.cow_id = a.cow_id
                WHERE c.farm_id = $1`, [farm_id]);

            if (getAbByFarm.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, rows: getAbByFarm.rows } })
            } else {
                message = "Don't have abdominal data in farm";
                console.log(message);
                return res.status(200).send({ data: { ment: 2, message: message } })
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
                getSuccess = await pool.query(`SELECT COUNT(a.ab_status) FROM abdominal a JOIN cows c ON a.cow_id = c.cow_id WHERE a.cow_id = $1 AND a.ab_status = 'success'`, [cow_id])
                countSuc = getSuccess.rows[0].count
                getFail = await pool.query(`SELECT COUNT(a.ab_status) FROM abdominal a JOIN cows c ON a.cow_id = c.cow_id WHERE a.cow_id = $1 AND a.ab_status = 'fail'`, [cow_id])
                countFail = getFail.rows[0].count

                setAb = []
                setDateAb = []

                abDate = getAbByCowID.rows[0].ab_date

                firstHeat = addDays(abDate, setDate[0].firstHeat);
                secondHeat = addDays(abDate, setDate[0].secondHeat);
                thirdHeat = addDays(abDate, setDate[0].thirdHeat);
                dryDate = addDays(abDate, setDate[0].dryDate);
                parDate = addDays(abDate, setDate[0].ParDate);

                //console.log(abDate + '\n' + firstHeat + '\n' + secondHeat + '\n' + thirdHeat + '\n' + dryDate + '\n' + parDate)

                const date = new Date();
                var currentDate = date.toISOString();

                ab_id = getAbByCowID.rows[0].abdominal_id

                setDateAb[0] =
                {
                    abdominal_id: ab_id,
                    firstHeat: firstHeat, firstcount: getNumberOfDays(currentDate, firstHeat),
                    secondHeat: secondHeat, secondcount: getNumberOfDays(currentDate, secondHeat),
                    thirdHeat: thirdHeat, thirdcount: getNumberOfDays(currentDate, thirdHeat),
                    dryDate: dryDate, drycount: getNumberOfDays(currentDate, dryDate),
                    parDate: parDate, parcount: getNumberOfDays(currentDate, parDate)
                }

                abdominal_id = getAbByCowID.rows[0].abdominal_id
                cow_ID = getAbByCowID.rows[0].cow_id
                round = getAbByCowID.rows[0].round
                ab_date = getAbByCowID.rows[0].ab_date
                ab_status = getAbByCowID.rows[0].ab_status
                ab_caretaker = getAbByCowID.rows[0].ab_caretaker
                semen_id = getAbByCowID.rows[0].semen_id
                semen_name = getAbByCowID.rows[0].semen_name
                semen_specie = getAbByCowID.rows[0].semen_specie
                ab_calf = getAbByCowID.rows[0].ab_calf
                note = getAbByCowID.rows[0].note
                type_id = getAbByCowID.rows[0].type_id
                specie_id = getAbByCowID.rows[0].specie_id
                farm_ID = getAbByCowID.rows[0].farm_id
                status_id = getAbByCowID.rows[0].status_id
                cow_no = getAbByCowID.rows[0].cow_no
                cow_name = getAbByCowID.rows[0].cow_name
                cow_birthday = getAbByCowID.rows[0].cow_birthday
                cow_sex = getAbByCowID.rows[0].cow_sex
                mom_id = getAbByCowID.rows[0].mom_id
                mom_specie = getAbByCowID.rows[0].mom_specie
                cow_image = getAbByCowID.rows[0].cow_image

                setAb[0] =
                {
                    abdominal_id: abdominal_id,
                    count: count,
                    countSuc: countSuc,
                    countFail: countFail,
                    cow_id: cow_ID,
                    round: round,
                    ab_date: ab_date,
                    ab_status: ab_status,
                    ab_caretaker: ab_caretaker,
                    semen_id: semen_id,
                    semen_name: semen_name,
                    semen_specie: semen_specie,
                    ab_calf: ab_calf,
                    note: note,
                    type_id: type_id,
                    specie_id: specie_id,
                    farm_id: farm_ID,
                    status_id: status_id,
                    cow_no: cow_no,
                    cow_name: cow_name,
                    cow_birthday: cow_birthday,
                    cow_sex: cow_sex,
                    mom_id: mom_id,
                    mom_specie: mom_specie,
                    cow_image: cow_image,
                    firstHeat: firstHeat, firstcount: getNumberOfDays(currentDate, firstHeat),
                    secondHeat: secondHeat, secondcount: getNumberOfDays(currentDate, secondHeat),
                    thirdHeat: thirdHeat, thirdcount: getNumberOfDays(currentDate, thirdHeat),
                    dryDate: dryDate, drycount: getNumberOfDays(currentDate, dryDate),
                    parDate: parDate, parcount: getNumberOfDays(currentDate, parDate)
                }

                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, count: count, rows: getAbByCowID.rows[0], date: setDateAb, all: setAb } })
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
                getCount = await pool.query(`SELECT COUNT(*) FROM abdominal a join cows c on a.cow_id = c.cow_id WHERE a.cow_id = $1`, [cow_id])
                count = getCount.rows[0].count
                getSuccess = await pool.query(`SELECT COUNT(a.ab_status) FROM abdominal a JOIN cows c ON a.cow_id = c.cow_id WHERE a.cow_id = $1 AND a.ab_status = 'success'`, [cow_id])
                countSuc = getSuccess.rows[0].count
                getFail = await pool.query(`SELECT COUNT(a.ab_status) FROM abdominal a JOIN cows c ON a.cow_id = c.cow_id WHERE a.cow_id = $1 AND a.ab_status = 'fail'`, [cow_id])
                countFail = getFail.rows[0].count

                setDateAb = []
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

                    setDateAb[index] =
                    {
                        firstHeat: firstHeat, firstcount: getNumberOfDays(currentDate, firstHeat),
                        secondHeat: secondHeat, secondcount: getNumberOfDays(currentDate, secondHeat),
                        thirdHeat: thirdHeat, thirdcount: getNumberOfDays(currentDate, thirdHeat),
                        dryDate: dryDate, drycount: getNumberOfDays(currentDate, dryDate),
                        parDate: parDate, parcount: getNumberOfDays(currentDate, parDate)
                    }
                    console.log(setDateAb)

                    abdominal_id = getAbByCowID.rows[index].abdominal_id
                    cow_ID = getAbByCowID.rows[index].cow_id
                    round = getAbByCowID.rows[index].round
                    ab_date = getAbByCowID.rows[index].ab_date
                    ab_status = getAbByCowID.rows[index].ab_status
                    ab_caretaker = getAbByCowID.rows[index].ab_caretaker
                    semen_id = getAbByCowID.rows[index].semen_id
                    semen_name = getAbByCowID.rows[index].semen_name
                    semen_specie = getAbByCowID.rows[index].semen_specie
                    ab_calf = getAbByCowID.rows[index].ab_calf
                    note = getAbByCowID.rows[index].note
                    type_id = getAbByCowID.rows[index].type_id
                    specie_id = getAbByCowID.rows[index].specie_id
                    farm_ID = getAbByCowID.rows[index].farm_id
                    status_id = getAbByCowID.rows[index].status_id
                    cow_no = getAbByCowID.rows[index].cow_no
                    cow_name = getAbByCowID.rows[index].cow_name
                    cow_birthday = getAbByCowID.rows[index].cow_birthday
                    cow_sex = getAbByCowID.rows[index].cow_sex
                    mom_id = getAbByCowID.rows[index].mom_id
                    mom_specie = getAbByCowID.rows[index].mom_specie
                    cow_image = getAbByCowID.rows[index].cow_image

                    setAb[index] =
                    {
                        abdominal_id: abdominal_id,
                        count: count,
                        countSuc: countSuc,
                        countFail: countFail,
                        cow_id: cow_ID,
                        round: round,
                        ab_date: ab_date,
                        ab_status: ab_status,
                        ab_caretaker: ab_caretaker,
                        semen_id: semen_id,
                        semen_name: semen_name,
                        semen_specie: semen_specie,
                        ab_calf: ab_calf,
                        note: note,
                        type_id: type_id,
                        specie_id: specie_id,
                        farm_id: farm_ID,
                        status_id: status_id,
                        cow_no: cow_no,
                        cow_name: cow_name,
                        cow_birthday: cow_birthday,
                        cow_sex: cow_sex,
                        mom_id: mom_id,
                        mom_specie: mom_specie,
                        cow_image: cow_image,
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
                return res.status(200).send({ data: { ment: 1, rows: getAbByCowID.rows, date: setDateAb, all: setAb } })
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

exports.getNotiWaitAbByFarmID = async (req, res) => {

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
                WHERE c.farm_id = $1 AND ab_status = $2`, [farm_id, "wait"]);

            if (getAbByFarmID.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, rows: getAbByFarmID.rows } })
            } else {
                message = ("Don't have wait status abdominal data in farm");
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

exports.getNotiAbByFarmID = async (req, res) => {

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
                WHERE c.farm_id = $1 AND ab_status = $2 AND ab_calf = $3
                ORDER BY ab_date`, [farm_id, "success", "false"]);

            if (getAbByFarmID.rows.length != 0) {
                message = "Sussess :)"
                console.log(message);
                return res.status(200).send({ data: { ment: 1, rows: getAbByFarmID.rows } })
            } else {
                message = ("Don't have wait status abdominal data in farm");
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

exports.updateFailAbStatusByID = async (req, res) => {

    try {

        if (req.body.abdominal_id.length == 0 || undefined) {
            message = "Abdominal ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const abdominal_id = req.body.abdominal_id

        const checkAbID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1`, [abdominal_id])

        if (checkAbID.rows.length == 0 || null) {
            message = "Don't have abdominal ID " + abdominal_id;
            return res.status(500).send({ data: { message: message } })
        }

            const findByID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1`, [abdominal_id])
            const ret = await pool.query(`UPDATE abdominal SET ab_status = $1 WHERE abdominal_id = $2`,
                ["fail", abdominal_id]);

            const checkUpdate = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1 `, [abdominal_id])

            if (checkUpdate.rows.length != 0) {
                message = "Abdominal Updated :)"
                console.log(message);
                return res.status(200).send({ data: { message: message, rows: checkUpdate.rows } })
            }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}

exports.updateSuccessAbStatusByID = async (req, res) => {

    try {

        if (req.body.abdominal_id.length == 0 || undefined) {
            message = "Abdominal ID is required"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const abdominal_id = req.body.abdominal_id

        const checkAbID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1`, [abdominal_id])

        if (checkAbID.rows.length == 0 || null) {
            message = "Don't have abdominal ID " + abdominal_id;
            return res.status(500).send({ data: { message: message } })
        }

            const findByID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1`, [abdominal_id])
            const ret = await pool.query(`UPDATE abdominal SET ab_status = $1 WHERE abdominal_id = $2`,
                ["success", abdominal_id]);

            const checkUpdate = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1 `, [abdominal_id])

            if (checkUpdate.rows.length != 0) {
                message = "Abdominal Updated :)"
                console.log(message);
                return res.status(200).send({ data: { message: message, rows: checkUpdate.rows } })
            }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })
}