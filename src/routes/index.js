const express = require("express");
const abdominal = require("../controller/abdominal");
const cows = require("../controller/cows");
const milk = require("../controller/milk");
const parturition = require("../controller/parturition");
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

router.get('/cows/:id', async(req, res, next) =>{
    const id = req.params.id;
    const ret = await cows.getCow(id);
    res.send(ret);
});  

router.post('/cows', async(req, res, next) =>{
    const json = req.body;
    const ret = await cows.addCow(json);
    res.send(ret);
})

router.put('/cows/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await cows.updateCow(id,json);
    res.send(ret);
})

router.delete('/cows/:id', async(req, res, next) => {
    const id = req.params.id;
    const ret = await cows.deleteCow(id);
    res.send(ret);
})


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
router.get('/parturition', async(req, res, next) =>{
    const ret = await parturition.getAllParturition();
    res.send(ret);
})


module.exports = router;