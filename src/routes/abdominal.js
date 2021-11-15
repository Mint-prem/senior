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

    app.post('/notification/ab/wait', controller.getNotiWaitAbByFarmID);

    app.post('/notification/ab', controller.getNotiAbByFarmID);
    
    app.post('/farms/abdominal/cows', controller.getDistinctCowByFarmID);
    
    app.post('/cows/abdominal/success', controller.getCowByAbdominal);

    app.post('/cows/abdominal', controller.getAbdominalByCowID);

    app.post('/cows/abdominals', controller.getManyAbdominalByCowID);

    app.post('/abdominal/create', controller.addNewAbdominal);

    app.put('/abdominal/edit', controller.updateAbdominalByID);

    app.put('/abdominal/fail', controller.updateFailAbStatusByID);

    app.put('/abdominal/success', controller.updateSuccessAbStatusByID);

    app.delete('/abdominal/delete', controller.deleteAbdominalByID);

};