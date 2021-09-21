const controller = require("../controller/role");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/roles', controller.getAllRole);

    app.post('/roles/id', controller.getRoleByID);

};