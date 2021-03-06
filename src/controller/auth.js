const config = require("../config/auth");
const pool = require('../database/pool')
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

var jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
//var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    // Save User to 
    try {

        const user_id = req.body.user_id;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const user_birthday = req.body.user_birthday;
        const mobile = req.body.mobile;
        const user_image = req.body.user_image;
        const email = req.body.email;
        const password = req.body.password;
        const check = await pool.query(`SELECT COUNT(email) FROM users`);

        message = "Method Error"
        const checkEmail = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
        const checkmobile = await pool.query(`SELECT * FROM users WHERE mobile = $1`, [mobile])


        if (checkEmail.rows.length != 0) {
            message = "Email already exist"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        } else if (checkmobile.rows.length != 0) {
            message = "Phone number already exist"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

        const hashedPass = await bcrypt.hash(req.body.password, 10)

        const addUser = await pool.query(`INSERT INTO users (firstname, lastname, user_birthday, mobile, user_image, email, password) values ($1,$2,$3,$4,$5,$6,$7)`,
            [firstname, lastname, user_birthday, mobile, user_image, email, hashedPass]);

        const checkCreated = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])

        if (checkCreated != 0) {
            message = "Account Created :)"
            console.log(message)
            return res.status(200).send({ data: { message: message, rows: checkCreated.rows } })
        } else {
            message = "Can't create new account"
            console.log(message)
            return res.status(500).send({ data: { message: message } })
        }

    } catch (err) {
        message = "Error"
        console.error(err.message);
    }

    return res.status(500).send({ data: { message: message } })

};

exports.signin = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    try {

        const account = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])

        if (account.rows.length == 0 || null) {
            return res.status(500).send({ data: { message: "????????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????" } })
        } else {
            let hashedPass = account.rows[0].password
            let isEqual = await bcrypt.compare(req.body.password, hashedPass)
            if (isEqual) {
                var token = jwt.sign({ user_id: account.rows[0].user_id }, config.secret, {
                    expiresIn: '120d' // 120 day
                    //expiresIn: 86400 // 24 hours
                });
                return res.status(200).send({ data: { token: token } })

            } else {
                return res.status(500).send({ data: { message: "?????????????????????????????????????????????????????? ???????????????????????????????????????" } })
            }
        }

    } catch (err) {
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: "??????????????????????????????????????????" } })
};

exports.checkHash = async (req, res) => {

    try {
        message = "T^T"
        let password = req.body.password
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPass)

        return res.status(200).send({data: { rows: hashedPass}})


    } catch (err) {
        message = "Error"
        console.error(err.message);
    }
    return res.status(500).send({ data: { message: message } })    
}