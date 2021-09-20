const controller = require("../controller/farms");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/farms/create', controller.addNewFarm);

    app.post("/farms/check", controller.checkFarm);

    app.get('/farms', controller.getAllFarm);

    app.post('/farms/id', controller.getFarmByID);

    app.post('/farms/code', controller.getFarmByCode);

    app.put('/farms/edit', controller.updateFarm);    

    app.delete('/farms/delete', controller.deleteFarm);
    
};