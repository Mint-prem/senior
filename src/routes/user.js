// const authJwt = require("../middleware/authJwt");
const { authJwt } = require("../middleware");
const pool = require('../database/pool')
const controller = require("../controller/user");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/test/all", controller.allAccess);
    
    app.get(
        "/me",
        [authJwt.verifyToken], async (req, res) => {
            try {

                console.log(req.user_id)
                const account = await pool.query(`SELECT * FROM userdiary WHERE user_id = $1`,[req.user_id]);
                res.send({data: account.rows});
            } catch (error) {
                console.log(error);
                res.send("An error occured");
            }
        }
    );
    
};