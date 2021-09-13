const controller = require("../controller/cows");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/getCowsByUser', controller.getCowsByUser);

    app.get('/cows', controller.getAllCow);

    app.get('/cows/:id', controller.getCowByID);
    
    app.post('/cows', controller.addNewCow);
    
    app.put('/cows/:id', controller.updateCowByID);
    
    app.delete('/cows/:id', controller.deleteCowByID);
    
};