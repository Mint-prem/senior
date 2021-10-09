const express = require("express");
const { route } = require("../../server");
const login = require("../controller/login");
const manage = require("../controller/manage");
const { getMilkByID, addNewMilk } = require("../controller/milk");
const milk = require("../controller/milk");
const parturition = require("../controller/parturition");
const role = require("../controller/role");
const userdairy = require("../controller/userdiary");
const request = require("../controller/user_request");
const schedule = require("../controller/vaccine_shedule");
const worker = require("../controller/worker");

const router = express.Router();

//route userdairy
// router.get('/user', async(req, res, next) => {
//     const ret = await userdairy.getAllUser();
//     res.send({data: ret});
// })

// router.get('/user/:id', async(req, res, next) =>{
//     const id = req.params.id;
//     const ret = await userdairy.getUserByID(id);
//     res.send({data: ret});
// })

// router.put('/user/:id', async(req, res, next) => {
//     const id = req.params.id;
//     const json = req.body;
//     const ret = await userdairy.updateUserByID(id,json);
//     res.send({data: ret});
// })

module.exports = router;