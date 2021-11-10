const pool = require("../database/pool");

checkDuplicateEmail = async (req, res, next) => {
  // Username
  const email = req.body.email;
  const password = req.body.password;

  try {
    const account = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
    const count = await pool.query(`SELECT COUNT(email) FROM users`)

    if (account.rows.length == 0 || null) {
      const countUser = parseInt(count.rows[0].count)
      var intCount = countUser + 1

      return res.status(200).send({ data: { user_id: (intCount).toString() } })

    } else if (account.rows.length != null) {
      return res.status(500).send({ data: { message: "อีเมลนี้ได้ถูกใช้งานแล้ว" } })
      next();

    }

    else return res.status(500).send({ data: { message: err } })

  }
  catch (err) {
    return res.status(500).send({ data: { message: err } })
    console.error(err)
  }
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;