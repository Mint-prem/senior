const controller = require("../controller/manage");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/requests', controller.getAllRequest);

    app.post('/farm/requests', controller.getRequestByFarmID);

    app.post('/requests/accept', controller.acceptRequestByUserID);

    app.delete('/requests/decline', controller.deleteRequestByUserID);

};