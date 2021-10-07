const express = require("express");
const { route } = require("../../server");
const login = require("../controller/login");
const manage = require("../controller/manage");
const { getMilkByID, addNewMilk } = require("../controller/milk");
const milk = require("../controller/milk");
const parturition = require("../controller/parturition");
const role = require("../controller/role");
const userdairy = require("../controller/userdairy");
const request = require("../controller/user_request");
const schedule = require("../controller/vaccine_shedule");
const worker = require("../controller/worker");

const router = express.Router();

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

router.put('/user/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await userdairy.updateUserByID(id,json);
    res.send({data: ret});
})

//route manage
router.get('/manage', async(req, res, next) =>{
    const ret = await manage.getAllRequest();
    res.send({data: ret});
})

router.get('/manage/:farmID', async(req, res, next) =>{
    const id = req.params.farmID;
    const ret = await manage.getRequestByFarmID(id);
    res.send({data: ret});
})

router.post('/manage', async(req, res, next) =>{
    const json = req.body;
    const ret = await manage.acceptRequestByUserID(json);
    res.send({data: ret});
})

router.delete('/manage/:farmid', async(req, res, next) => {
    const id = req.params.farmid;
    const json = req.body;
    const ret = await manage.deleteRequestByUserID(id, json);
    res.send({data: ret});
})

module.exports = router;