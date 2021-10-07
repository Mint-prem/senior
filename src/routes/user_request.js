const controller = require("../controller/user_request");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/requests/id', controller.getRequestByUserID);

    app.post('/requests/add', controller.addNewRequest);

    app.delete('/requests/cancel', controller.cancelRequestByUserID);

};