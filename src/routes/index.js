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


router.put('/user/:id', async(req, res, next) => {
    const id = req.params.id;
    const json = req.body;
    const ret = await userdairy.updateUserByID(id,json);
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

//request
router.get('/request/:id', async(req, res, next) =>{
    const id = req.params.id
    const ret = await request.getRequestByUserID(id);
    res.send({data: ret});
})

router.post('/request', async(req, res, next) =>{
    const json = req.body;
    const ret = await request.addNewRequest(json);
    res.send({data: ret});
})

router.delete('/request/:id', async(req, res, next) => {
    const id = req.params.id;
    const ret = await request.cancelRequestByUserID(id);
    res.send({data: ret});
})

module.exports = router;