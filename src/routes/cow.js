const controller = require("../controller/cows");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/users/cow', controller.getCowsByUser);

    app.post('/farms/cow', controller.getCowsByFarm);

    app.get('/cows', controller.getAllCow);

    app.post('/cows/id', controller.getCowByID);

    app.post('/cows/create', controller.addNewCow);

    app.put('/cows/edit', controller.updateCowByID);

    app.delete('/cows/delete', controller.deleteCowByID);

};