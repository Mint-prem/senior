const controller = require("../controller/statuscow");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get('/statuscows', controller.getAllStatusCow);

    app.post('/statuscows/id', controller.getStatusCowByID);

};