const controller = require("../controller/abdominal");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/abdominal', controller.getAllabdominal);

    app.post('/abdominal/id', controller.getAbdominalByID);

    app.post('/farms/abdominal', controller.getAbdominalByFarmID);

    app.post('/cows/abdominal', controller.getAbdominalByCowID);

    app.post('/abdominal/create', controller.addNewAbdominal);

    app.put('/abdominal/edit', controller.updateAbdominalByID);

    app.delete('/abdominal/delete', controller.deleteAbdominalByID);

};