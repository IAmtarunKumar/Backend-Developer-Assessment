const express = require("express");
require("dotenv").config();
//bcrypt - hash the password
const bcrypt = require("bcrypt");
//jsonwebtoken
const jwt = require("jsonwebtoken");

//customer model
const { UserModel } = require("../model/user.model");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Working");
});

userRouter.post("/register", async (req, res) => {
  let { username, email, password } = req.body;

  try {
    let userData = await UserModel.findOne({ email: email });
    if (userData) {
      res.send({ msg: "Email ID is already exists. Please go to Login" });
    } else {
      bcrypt.hash(password, 6, async (err, hash) => {
        if (hash) {
          let user = await UserModel({
            username,
            email,
            password: hash,
          });
          await user.save();
          res.status(200).send({ msg: "Register Successfully" });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let userData = await UserModel.findOne({ email });
    if (userData) {
      bcrypt.compare(password, userData.password, async (err, result) => {
        if (result) {
          var token = jwt.sign(
            { id: userData._id, username: userData.username },
            process.env.secretKey
          );

          res.send({ msg: "login successfully", token });
        }
      });
    } else {
      res.send({ msg: "Please register first" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
});

module.exports = { userRouter };
