const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/signup",
        [
            verifySignUp.checkDuplicateEmail,
        ],
    );

    app.post("/register", controller.signup);

    app.post("/signin", controller.signin);

    app.post("/hashPass", controller.checkHash)
};