const express = require("express");
const { route } = require("../../server");
const abdominal = require("../controller/abdominal");
const cows = require("../controller/cows");
const login = require("../controller/login");
const manage = require("../controller/manage");
const { getMilkByID, addNewMilk } = require("../controller/milk");
const milk = require("../controller/milk");
const parturition = require("../controller/parturition");
const role = require("../controller/role");
const species = require("../controller/species");
const statuscow = require("../controller/statuscow");
const typecow = require("../controller/typecow");
const userdairy = require("../controller/userdairy");
const request = require("../controller/user_request");
const vaccine = require("../controller/vaccine");
const schedule = require("../controller/vaccine_shedule");
const worker = require("../controller/worker");

const router = express.Router();

//route cow


//route species
router.get('/species', async(req, res, next) =>{
    const ret = await species.getAllSpecies();
    res.send({data: ret});
})

router.get('/species/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await species.getSpeciesByID(id);
    res.send({data: ret});
})

//route statuscow
router.get('/statuscows', async(req, res, next) =>{
    const ret = await statuscow.getAllStatusCow();
    res.send({data: ret});
})

router.get('/statuscows/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await statuscow.getStatusCowByID(id);
    res.send({data: ret});
})

//route milk
router.get('/milks', async(req, res, next) =>{
    const ret = await milk.getAllMilk();
    res.send({data: ret});
})

router.get('/milks/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await getMilkByID(id);
    res.send({data: ret});
});  

router.post('/milks', async(req, res, next) =>{
    const json = req.body;
    const ret = await addNewMilk(json);
    res.send({data: ret});
})

router.put('/milks/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await milk.updateMilkByID(id,json);
    res.send({data: ret});
})

router.delete('/milks/:id', async(req, res, next) => {
    const id = req.params.id;
    const ret = await milk.deleteMilkByID(id);
    res.send({data: ret});
})


//route typecow
router.get('/typecows', async(req, res, next) =>{
    const ret = await typecow.getAllTypecow();
    res.send({data: ret});
})

router.get('/typecows/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await typecow.getTypecowByID(id);
    res.send({data: ret});
})


//route vaccine
router.get('/vaccines', async(req, res, next) =>{
    const ret = await vaccine.getAllVaccine();
    res.send({ data: ret });
})

router.get('/vaccines/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await vaccine.getVaccineByID(id);
    res.send({data: ret});
})

//route vaccine_schedule
router.get('/schedule', async(req, res, next) =>{
    const ret = await schedule.getAllSchedule();
    res.send({data: ret});
})

router.get('/schedule/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await schedule.getScheduleByID(id);
    res.send({data: ret});
});  

router.post('/schedule', async(req, res, next) =>{
    const json = req.body;
    const ret = await schedule.addNewSchedule(json);
    res.send({data: ret});
})

router.put('/schedule/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await schedule.updateScheduleByID(id,json);
    res.send({data: ret});
})

router.delete('/schedule/:id', async(req, res, next) => {
    const id = req.params.id;
    const ret = await schedule.deleteScheduleByID(id);
    res.send({data: ret});
})

//route abdominal
router.get('/abdominal', async(req, res, next) =>{
    const ret = await abdominal.getAllabdominal();
    res.send({data: ret});
})

router.get('/abdominal/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await abdominal.getAbdominalByID(id);
    res.send({data: ret});
})

router.post('/abdominal', async(req, res, next) =>{
    const json = req.body;
    const ret = await abdominal.addNewAbdominal(json);
    res.send({data: ret});
})

router.put('/abdominal/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await abdominal.updateAbdominalByID(id,json);
    res.send({data: ret});
})

router.delete('/abdominal/:id', async(req, res, next) => {
    const id = req.params.id;
    const ret = await abdominal.deleteAbdominalByID(id);
    res.send({data: ret});
})

//route parturition
router.get('/parturition', async(req, res, next) =>{
    const ret = await parturition.getAllParturition();
    res.send({data: ret});
})

router.get('/parturition/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await parturition.getParturitionByID(id);
    res.send({data: ret});
})

router.post('/parturition', async(req, res, next) =>{
    const json = req.body;
    const ret = await parturition.addNewParturition(json);
    res.send({data: ret});
})

router.put('/parturition/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await parturition.updateParturitionByID(id,json);
    res.send({data: ret});
})

router.delete('/parturition/:id', async(req, res, next) => {
    const id = req.params.id;
    const ret = await parturition.deleteParturitionByID(id);
    res.send({data: ret});
})

//route userdairy
router.get('/user', async(req, res, next) => {
    const ret = await userdairy.getAllUser();
    res.send({data: ret});
})

router.get('/user/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await userdairy.getUserByID(id);
    res.send({data: ret});
})

router.post('/register', async(req, res, next) =>{
    const json = req.body;
    const ret = await userdairy.createNewUser(json);
    res.send({data: ret});
})

router.put('/user/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await userdairy.updateUserByID(id,json);
    res.send({data: ret});
})

//route login
router.post('/login', async(req, res, next) =>{
    const json = req.body;
    const ret = await login.authen(json);
    res.send({data: ret});
})

//route farm

//route role
router.get('/roles', async(req, res, next) =>{
    const ret = await role.getAllRole();
    res.send({data: ret});
})

router.get('/roles/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await role.getRoleByID(id);
    res.send({data: ret});
})

//route worker
router.get('/worker', async(req, res, next) =>{
    const ret = await worker.getAllWorker();
    res.send({data: ret});
})

router.get('/worker/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await worker.getWorkerByID(id);
    res.send({data: ret});
});  

router.post('/worker', async(req, res, next) =>{
    const json = req.body;
    const ret = await worker.addNewWorker(json);
    res.send({data: ret});
})

router.put('/worker/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await worker.updateWorkerByID(id,json);
    res.send({data: ret});
})

router.delete('/worker/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await worker.deleteWorkerByUserID(id,json);
    res.send({data: ret});
})

//route manage
router.get('/request', async(req, res, next) =>{
    const ret = await request.getAllRequest();
    res.send({data: ret});
})

router.get('/request/:farmID', async(req, res, next) =>{
    const id = req.params.farmID;
    const ret = await manage.getRequestByFarmID(id);
    res.send({data: ret});
})

router.post('/request', async(req, res, next) =>{
    const json = req.body;
    const ret = await request.addNewRequest(json);
    res.send({data: ret});
})

router.post('/manage', async(req, res, next) =>{
    const json = req.body;
    const ret = await manage.acceptRequestByUserID(json);
    res.send({data: ret});
})

module.exports = router;