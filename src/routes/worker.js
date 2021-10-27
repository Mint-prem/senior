const controller = require("../controller/worker");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/workers', controller.getAllWorker);

    app.post('/workers/id', controller.getWorkerByID);

    app.post('/workers/user', controller.getWorkerByUserID);

    app.post('/farm/workers', controller.getWorkerByFarm);

    app.post('/workers/add', controller.addNewWorker);

    app.put('/workers/edit', controller.updateRoleByWorkerID);

    app.delete('/worker/delete', controller.deleteWorkerByUserID);

    app.delete('/workers/delete', controller.deleteWorkerByWorkerID);


};