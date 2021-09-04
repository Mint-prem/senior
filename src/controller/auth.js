const config = require("../config/auth");
const pool = require('../database/pool')
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to 
  const user_id = req.body.user_id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const birthday = req.body.birthday;
  const mobile = req.body.mobile;
  const user_image = req.body.user_image;
  const email = req.body.email;
  const password = req.body.password;
  const check = await pool.query(`SELECT COUNT(email) FROM userdiary`);

  try {
    const ret = await pool.query(`INSERT INTO userdiary (user_id, firstname, lastname, birthday, mobile, user_image, email, password) values ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [user_id, firstname, lastname, birthday, mobile, user_image, email, password]);
    const account = await pool.query(`SELECT COUNT(email) FROM userdiary`)
    
    if (account != check) {
      res.status(200).send({ data: { message: "Account Created"}});
    } else if (account == check) {
      res.status(500).send({message: "Cannot create new account"})
    }

  } catch (err) {
    res.status(500).send({message: err.message })
  }
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
        res.status(200).send({ data: { token: token } })

      }
    }

  } catch (err) {
    res.status(500).send({ message: err })
    console.error(err)
  }

};