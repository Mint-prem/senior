const controller = require("../controller/typecow");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // app.get("/typecow", (req, res) =>{
    //     controller.getAllTypecow(req,res);
    // })

    app.get('/typecow', controller.getAllTypecow);

    app.post('/typecow/id', controller.getTypecowByID);
};