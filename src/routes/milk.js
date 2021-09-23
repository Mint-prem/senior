const controller = require("../controller/milk");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/milks', controller.getAllMilk);

    app.get('/milks/month', controller.getAllMilkMonth);
    
    app.get('/milks/year', controller.getAllMilkYear);

    app.post('/milks/id', controller.getMilkByID);

    app.post('/farms/milks', controller.getMilkByFarmID);

    //app.post('/cows/milks', controller.getMilkByCowID);

    //app.post('/milks/create', controller.addNewMilk);

    //app.put('/milks/edit', controller.updateMilkByID);

    //app.delete('/milks/delete', controller.deleteMilkByID);

};