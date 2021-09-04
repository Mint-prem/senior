const pool = require("../database/pool");

checkDuplicateEmail = async (req, res, next) => {
  // Username
  const email = req.body.email;

  try {
    const account = await pool.query(`SELECT * FROM userdiary WHERE email = $1`, [email])
    const count = await pool.query(`SELECT COUNT(email) FROM userdiary`)

    if (account.rows.length == 0 || null) {
      const countUser = parseInt(count.rows[0].count)
      var intCount = countUser+1

      res.status(200).send({ data: { user_id: (intCount).toString() } })

    } else if (account.rows.length != null) {
      res.status(500).send({ message: account.rows.length + "Failed! email is already in use!" })
      next();
    }
  }
  catch (err) {
    res.status(500).send({ message: err })
    console.error(err)
  }
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;