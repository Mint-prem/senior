// const authJwt = require("../middleware/authJwt");
const { authJwt } = require("../middleware");
const pool = require('../database/pool')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/me",
    [authJwt.verifyToken], async (req, res) => {
      try {
        console.log(req.user_id)
        const account = await pool.query(`SELECT * FROM users u join
        workers w on u.user_id = w.user_id join
        roles r on w.user_id = r.role_id join
        farms f on w.farm_id = f.farm_id WHERE u.user_id = $1`, [req.user_id]);
        
     
        if (account.rows.length == 0 || null) {
          const user = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [req.user_id]);

          if (user.rows.length == 0 || null) {
            return res.status(500).send({ message: "Account not found!!" });
          } else {
            return res.send({ data: { message: 'B', rows:user.rows}});
          }

        } else if (account.rows[0].farm_id != null) {
          return res.send({ data: { message: 'A', rows: account.rows }});
        } else {
          return res.send({ data: account.rows});
        }

      } catch (error) {
        console.log(error);
        return res.send("An error occured");
      }
    }
  );

};