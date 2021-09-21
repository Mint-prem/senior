const pool = require(`../database/pool`);

exports.getAllabdominal = async (req, res) => {

  try {
    message = "Method Error"

    const getAllAb = await pool.query(`SELECT * FROM abdominal`);
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
    const getAbByFarmID = await pool.query(
      `SELECT * FROM abdominal
      INNER JOIN cows ON cows.cow_id = abdominal.cow_id
      WHERE cows.farm_id = $1`, [farm_id]
      );

    if (getAbByID.rows.length != 0) {
      message = "Sussess :)"
      console.log(message);
      return res.status(200).send({ data: { counts: getAbByFarmID.rowCount, rows: getAbByFarmID.rows } })
    } else {
      message = ("Don't have Farm ID " + farm_id);
      return res.status(500).send({ data: { message: message } })
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
    const getAbByCowID = await pool.query("SELECT * FROM abdominal WHERE cow_id = $1", [cow_id]);
    if (getAbByCowID.rows.length != 0) {
      message = "Sussess :)"
      console.log(message);
      return res.status(200).send({ data: { rows: getAbByCowID.rows } })
    } else {
      message = "Don't have cow ID " + cow_id;
      return res.status(500).send({ data: { message: message } })
    }
  } catch (err) {
    console.error(err.message);
  }
  return res.status(500).send({ data: { message: message } })
}

exports.addNewAbdominal = async (req, res) => {

  //Logic ไม่ครบ
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

    message = "Method Error"

    const AddNew = await pool.query(`INSERT INTO abdominal (cow_id, round, ab_date, ab_status, ab_caretaker, dry_period, semen_id, semen_name, semen_specie, note) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [cow_id, round, ab_date, ab_status, ab_caretaker, dry_period, semen_id, semen_name, semen_specie, note]);
    const CheckAdd = await pool.query(`SELECT * FROM abdominal WHERE cow_id = $1 AND round = $2`, [cow_id, round])

    if(CheckAdd.rows.length != 0){
      message = "Abdominal Created :)"
      console.log(message)
      return res.status(200).send({ data: { rows: CheckAdd.rows } })
    }

    console.log(message);

  } catch (err) {
    message = "Error"
    console.error(err.message);
  }
  return res.status(500).send({ data: { message: message } })
}

exports.updateAbdominalByID = async (req, res) => {

  try {
    //ยังไม่ได้ทำต่อ
    message = "Method Error"
    if (findByID.rows.length == 0 || null) {
      message = "Don't have abdominal ID " + id;
      return ret.message;
    }

    const findByID = await pool.query(`SELECT * FROM abdominal WHERE abdominal_id = ` + id)
    const ret = await pool.query(`UPDATE abdominal SET round = $1, ab_date = $2, ab_status = $3, ab_caretaker = $4, dry_period = $5, semen_id = $6, semen_name = $7, note = $8, cow_id = $9, semen_specie = $10 WHERE abdominal_id = $11`,
      [json.round, json.ab_date, json.ab_status, json.ab_caretaker, json.dry_period, json.semen_id, json.semen_name, json.note, json.cow_id, json.semen_specie, id]);
    ret.message = "Abdominal Updated :)"
    console.log(ret.message);
    return ret.message;
  } catch (err) {
    ret.message = "Error"
    console.error(err.message);
  }


  return ret.message;
}

exports.deleteAbdominalByID = async (id) => {
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