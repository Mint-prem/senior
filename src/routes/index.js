const cows = require("../controller/cows")
const express = require("express");
const router = express.Router();

router.get('/cows', async(req, res, next) =>{
    const ret = await cows.getAllCow();
    res.send(ret);
});  

module.exports = router;