const express = require("express");
const cows = require("../controller/cows");
const milk = require("../controller/milk");
const species = require("../controller/species");
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

//route vaccine

//route vaccine_shedule

//route abdominal

//route parturition


module.exports = router;