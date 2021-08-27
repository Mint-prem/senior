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
        const account = await pool.query(`SELECT * FROM userdiary u join
        worker w on u.user_id = w.user_id join
        role r on w.user_id = r.role_id join
        farm f on w.farm_id = f.farm_id WHERE u.user_id = $1`, [req.user_id]);
        res.send({ data: account.rows });
      } catch (error) {
        console.log(error);
        res.send("An error occured");
      }
    }
  );

};