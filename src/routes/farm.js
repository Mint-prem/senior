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

    // router.get('/farms', async(req, res, next) =>{
    //     const ret = await farm.getAllFarm();
    //     res.send({data: ret});
    // })
    
    // router.get('/farms/:id', async(req, res, next) =>{
    //     const id = req.params.id;
    //     const ret = await farm.getFarmByID(id);
    //     res.send({data: ret});
    // });  
    
    // router.post('/farm', async(req, res, next) =>{
    //     const json = req.body;
    //     const ret = await farm.addNewFarm(json);
    //     res.send({data: ret});
    // })
    
    // router.put('/farms/:id', async(req, res, next) => {
    //     const id = req.params.id;
    //     const json = req.body;
    //     const ret = await farm.updateFarmByID(id,json);
    //     res.send({data: ret});
    // })
    
    // router.delete('/farms/:id', async(req, res, next) => {
    //     const id = req.params.id;
    //     const ret = await farm.deleteFarmByID(id);
    //     res.send({data: ret});
    // })
};