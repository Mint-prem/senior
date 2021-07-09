const express = require("express");
const { route } = require("../../server");
const abdominal = require("../controller/abdominal");
const cows = require("../controller/cows");
const farm = require("../controller/farm");
const login = require("../controller/login");
const { getMilkByID, addNewMilk } = require("../controller/milk");
const milk = require("../controller/milk");
const parturition = require("../controller/parturition");
const role = require("../controller/role");
const species = require("../controller/species");
const statuscow = require("../controller/statuscow");
const typecow = require("../controller/typecow");
const userdairy = require("../controller/userdairy");
const vaccine = require("../controller/vaccine");
const schedule = require("../controller/vaccine_shedule");

const router = express.Router();

//route cow
router.get('/cows', async(req, res, next) =>{
    const ret = await cows.getAllCow();
    res.send({data: ret});
});  

router.get('/cows/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await cows.getCowByID(id);
    res.send({data: ret});
});  

router.post('/cows', async(req, res, next) =>{
    const json = req.body;
    const ret = await cows.addNewCow(json);
    res.send({data: ret});
})

router.put('/cows/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await cows.updateCowByID(id,json);
    res.send({data: ret});
})

router.delete('/cows/:id', async(req, res, next) => {
    const id = req.params.id;
    const ret = await cows.deleteCowByID(id);
    res.send({data: ret});
})


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
    res.send(ret);
});  

router.post('/milks', async(req, res, next) =>{
    const json = req.body;
    const ret = await addNewMilk(json);
    res.send(ret);
})

router.put('/milks/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await milk.updateMilkByID(id,json);
    res.send(ret);
})

router.delete('/milks/:id', async(req, res, next) => {
    const id = req.params.id;
    const ret = await milk.deleteMilkByID(id);
    res.send(ret);
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
router.get('/farms', async(req, res, next) =>{
    const ret = await farm.getAllFarm();
    res.send({data: ret});
})

router.get('/farms/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await farm.getFarmByID(id);
    res.send({data: ret});
});  

router.post('/farms', async(req, res, next) =>{
    const json = req.body;
    const ret = await farm.addNewFarm(json);
    res.send({data: ret});
})

router.put('/farms/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await farm.updateFarmByID(id,json);
    res.send({data: ret});
})

router.delete('/farms/:id', async(req, res, next) => {
    const id = req.params.id;
    const ret = await farm.deleteFarmByID(id);
    res.send({data: ret});
})

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

module.exports = router;