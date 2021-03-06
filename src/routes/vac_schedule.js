const controller = require("../controller/vaccine_shedule");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/schedules', controller.getAllSchedule);

    app.post('/schedules/id', controller.getScheduleByID);

    app.post('/farm/schedules', controller.getScheduleByFarmID);

    app.post('/farm/distinct/vac', controller.getDistinctVacByFarmID);

    app.post('/farm/distinct/cow', controller.getDistinctCowByVacID);

    app.post('/cows/shedules', controller.getScheduleByCowID);

    app.post('/cows/shedules/vac', controller.getVacScheduleByCowID);

    app.post('/schedules/create', controller.addNewSchedule);

    app.put('/schedules/edit', controller.updateScheduleByID);

    app.delete('/schedules/delete', controller.deleteScheduleByID);

    app.post('/notification/vac', controller.getNotiVacByFarmID);


};