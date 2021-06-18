const express = require("express");
const abdominal = require("../controller/abdominal");
const cows = require("../controller/cows");
const milk = require("../controller/milk");
const species = require("../controller/species");
const typecow = require("../controller/typecow");
const vaccine = require("../controller/vaccine");
const vaccine_shedule = require("../controller/vaccine_shedule");
const router = express.Router();

//route cow
router.get('/cows', async(req, res, next) =>{
    const ret = await cows.getAllCow();
    res.send(ret);
});  

//route species
router.get('/species', async(req, res, next) =>{
    const ret = await species.getAllSpecies();
    res.send(ret);
})

//route milk
router.get('/milks', async(req, res, next) =>{
    const ret = await milk.getAllMilk();
    res.send(ret);
})

//route typecow
router.get('/typecows', async(req, res, next) =>{
    const ret = await typecow.getAllTypecow();
    res.send(ret);
})


//route vaccine
router.get('/vaccines', async(req, res, next) =>{
    const ret = await vaccine.getAllVaccine();
    res.send(ret);
})

//route vaccine_shedule
router.get('/shedule', async(req, res, next) =>{
    const ret = await vaccine_shedule.getAllVaccineShedule();
    res.send(ret);
})

//route abdominal
router.get('/abdominal', async(req, res, next) =>{
    const ret = await abdominal.getAllabdominal();
    res.send(ret);
})

//route parturition


module.exports = router;