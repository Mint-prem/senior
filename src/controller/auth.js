const config = require("../config/auth");
const pool = require('../database/pool')
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    user_id: req.body.user_id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthday: req.body.birthday,
    mobile: req.body.mobile,
    user_image: req.body.user_image,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 6)
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  try {
    const account = await pool.query(`SELECT * FROM userdiary WHERE email = $1`, [email])

    if (account.rows.length == 0 || null) {
      res.status(500).send({ message: "Account not found!!" })
    } else {
      if (password != account.rows[0].password) {
        res.status(500).send({ message: "Wrong Password" })
      } else if (password == account.rows[0].password) {
        var token = jwt.sign({ user_id: account.rows[0].user_id }, config.secret, {
          expiresIn: '120d' // 120 day
          //expiresIn: 86400 // 24 hours
        });
        res.status(200).send({ accessToken: token })

      }
    }

  } catch (err) {
    res.status(500).send({ message: err })
    console.error(err)
  }

};