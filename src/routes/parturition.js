const controller = require("../controller/parturition");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/parturition', controller.getAllParturition);

    app.post('/parturition/id', controller.getParturitionByID);

    app.post('/farms/parturition', controller.getParturitionByFarmID);

    app.post('/farms/parturition/cows', controller.getDistinctCowByFarmID);

    app.post('/cows/parturition', controller.getParturitionByCowID);

    app.post('/parturition/create', controller.addNewParturition);

    app.put('/parturition/edit', controller.updateParturitionByID);

    app.delete('/parturition/delete', controller.deleteParturitionByID);

};