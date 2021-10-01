const pool = require(`../database/pool`);

exports.getAllabdominal = async (req, res) => {

  try {
    message = "Method Error"

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
    const abdominal_id = req.body.abdominal_id
    message = "Method Error"

    const getAbByID = await pool.query("SELECT * FROM abdominal WHERE abdominal_id = $1", [abdominal_id]);
    if (getAbByID.rows.length != 0) {
      message = "Sussess :)"
      console.log(message);
      return res.status(200).send({ data: { rows: getAbByID.rows } })
    } else {
      message = ("Don't have abdominal ID " + abdominal_id);
      return res.status(500).send({ data: { message: message } })
    }
  } catch (err) {
    console.error(err.message);
  }
  return res.status(500).send({ data: { message: message } })
}

exports.getAbdominalByFarmID = async (req, res) => {

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
    } else {
      const getAbByFarmID = await pool.query(
        `SELECT * FROM abdominal
        INNER JOIN cows ON cows.cow_id = abdominal.cow_id
        WHERE cows.farm_id = $1`, [farm_id]
      );

      if (getAbByFarmID.rows.length != 0) {
        message = "Sussess :)"
        console.log(message);
        return res.status(200).send({ data: { ment: 1, rows: getAbByFarmID.rows } })
      } else {
        message = ("Don't have abdominal data in farm");
        return res.status(200).send({ data: { ment: 2, message: message } })
      }
    }

  } catch (err) {
    console.error(err.message);
  }
  return res.status(500).send({ data: { message: message } })
}

exports.getAbdominalByCowID = async (req, res) => {

  try {
    const cow_id = req.body.cow_id
    message = "Method Error"

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

    const getAbByCowID = await pool.query("SELECT * FROM abdominal a join cows c on a.cow_id = c.cow_id WHERE a.cow_id = $1", [cow_id]);
    if (getAbByCowID.rows.length != 0) {
      message = "Sussess :)"
      console.log(message);
      return res.status(200).send({ data: { ment: 1,rows: getAbByCowID.rows } })
    } else {
      message = "Cow id " + cow_id + " don't have abdominal data";
      return res.status(200).send({ data: { ment: 2, message: message } })
    }
  } catch (err) {
    console.error(err.message);
  }
  return res.status(500).send({ data: { message: message } })
}

exports.addNewAbdominal = async (req, res) => {

  try {
    const cow_id = req.body.cow_id
    const round = req.body.round
    const ab_date = req.body.ab_date
    const ab_status = req.body.ab_status
    const ab_caretaker = req.body.ab_caretaker
    const dry_period = req.body.dry_period
    const semen_id = req.body.semen_id
    const semen_name = req.body.semen_name
    const semen_specie = req.body.semen_specie
    const note = req.body.note

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

    const AddNew = await pool.query(`INSERT INTO abdominal (cow_id, round, ab_date, ab_status, ab_caretaker, dry_period, semen_id, semen_name, semen_specie, note) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [cow_id, round, ab_date, ab_status, ab_caretaker, dry_period, semen_id, semen_name, semen_specie, note]);

    const CheckAdd = await pool.query(`SELECT * FROM abdominal WHERE cow_id = $1 AND round = $2`, [cow_id, round])

    if (CheckAdd.rows.length != 0) {
      message = "Abdominal Created :)"
      console.log(message)
      return res.status(200).send({ data: { message: message, rows: CheckAdd.rows } })
    }

  } catch (err) {
    message = "Error"
    console.error(err.message);
  }
  return res.status(500).send({ data: { message: message } })
}

exports.updateAbdominalByID = async (req, res) => {

  try {
    const abdominal_id = req.body.abdominal_id
    const cow_id = req.body.cow_id
    const round = req.body.round
    const ab_date = req.body.ab_date
    const ab_status = req.body.ab_status
    const ab_caretaker = req.body.ab_caretaker
    const dry_period = req.body.dry_period
    const semen_id = req.body.semen_id
    const semen_name = req.body.semen_name
    const semen_specie = req.body.semen_specie
    const note = req.body.note

    if (abdominal_id.length == 0) {
      message = "Please abdominal ID"
      console.log(message)
      return res.status(500).send({ data: { message: message } })
    } else if (cow_id.length == 0 || null) {
      message = "Please Fill cow ID"
      console.log(message)
      return res.status(500).send({ data: { message: message } })
    }

    const checkAbID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1`, [abdominal_id])
    const checkCow = await pool.query(`SELECT * FROM cows WHERE cow_id = $1`, [cow_id])

    if (checkAbID.rows.length == 0 || null) {
      message = "Don't have abdominal ID " + abdominal_id;
      return res.status(500).send({ data: { message: message } })
    } else if (checkCow.rows.length == 0 || null) {
      message = "Don't have cow ID: " + cow_id;
      console.log(message)
      return res.status(500).send({ message: message })
    }

    const findByID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = ` + abdominal_id)
    const ret = await pool.query(`UPDATE abdominal SET cow_id = $1, round = $2, ab_date = $3, ab_status = $4, ab_caretaker = $5, dry_period = $6, semen_id = $7, semen_name = $8, semen_specie = $9, note = $10 WHERE abdominal_id = $11`,
      [cow_id, round, ab_date, ab_status, ab_caretaker, dry_period, semen_id, semen_name, semen_specie, note, abdominal_id]);
    
    const checkUpdate = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = ` + abdominal_id)

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

exports.deleteAbdominalByID = async (req, res) => {

  try {
    const abdominal_id = req.body.abdominal_id

    if (abdominal_id.length == 0) {
      message = "Please abdominal ID"
      console.log(message)
      return res.status(500).send({ data: { message: message } })
    }

    const checkAbID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = $1`, [abdominal_id])
    if (checkAbID.rows.length == 0 || null) {
      message = "Don't have abdominal ID " + abdominal_id;
      return res.status(500).send({ data: { message: message } })

    } else {
      const delAb = await pool.query(`DELETE FROM abdominal WHERE abdominal_id = $1`, [abdominal_id]);
      message = "Abdominal Deleted :)"
      console.log(message);
      return res.status(500).send({ data: { message: message } })

    }

  } catch (err) {
    message = "Error"
    console.error(err.message);
  }


  return res.status(500).send({ data: { message: message } })

}