const express = require("express");
const { route } = require("../../server");
const abdominal = require("../controller/abdominal");
const cows = require("../controller/cows");
const login = require("../controller/login");
const milk = require("../controller/milk");
const parturition = require("../controller/parturition");
const species = require("../controller/species");
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

//route milk
router.get('/milks', async(req, res, next) =>{
    const ret = await milk.getAllMilk();
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


module.exports = router;