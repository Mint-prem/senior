const controller = require("../controller/species");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get('/species', controller.getAllSpecies);

    app.post('/species/id', controller.getSpeciesByID);

// router.get('/species', async(req, res, next) =>{
//     const ret = await species.getAllSpecies();
//     res.send({data: ret});
// })

// router.get('/species/:id', async(req, res, next) =>{
//     const id = req.params.id;
//     const ret = await species.getSpeciesByID(id);
//     res.send({data: ret});
// })

};