const express = require("express");
const cows = require("../controller/cows")
const species = require("../controller/species");
const router = express.Router();

router.get('/cows', async(req, res, next) =>{
    const ret = await cows.getAllCow();
    res.send(ret);
});  

router.get('/species', async(req, res, next) =>{
    const ret = await species.getAllSpecies();
    res.send(ret);
})

module.exports = router;