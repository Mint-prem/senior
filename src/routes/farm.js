const controller = require("../controller/farms");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/createFarm", controller.addNewFarm);

    app.post("/checkFarm", controller.checkFarm);

    app.get('/farms', controller.getAllFarm);

    app.get('/farms/:id', controller.updateFarmByID);

    app.put('/farms/:id', controller.updateFarmByID);    

    app.delete('/farms/:id', controller.deleteFarmByID);
    
};