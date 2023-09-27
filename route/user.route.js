const express = require("express");
require("dotenv").config();

const nodemailer = require("nodemailer");

//bcrypt - hash the password
const bcrypt = require("bcrypt");
//jsonwebtoken
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");

const {
  authentication,
} = require("../config/middleware/authentication.middleware");

//customer model
const { UserModel } = require("../model/user.model");
const { BlacklistModel } = require("../model/blacklist_token.model");

const userRouter = express.Router();

//Register
userRouter.post("/register", async (req, res) => {
  let { username, email, password } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp);

  try {
    let userData = await UserModel.findOne({ email: email });
    if (userData) {
      res.send({ msg: "Email ID is already exists. Please go to Login" });
    } else {
      /////////////////////////////////////////////////////

      // Generate OTP

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "tarunkumarmahto2000@gmail.com",
          pass: "wlghihttobcllmvj",
        },
      });

      var mailOptions = {
        from: "tarunkumarmahto2000@gmail.com",
        to: email,
        subject: " Name- " + username + " | " + " Email- " + email,
        text: `Your OTP is ${otp}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email has been sent", express.response.info);
        }
      });

      // res.send({ msg: "Email is Sent" });

      ///////////////////////////////////////////////////

      bcrypt.hash(password, 6, async (err, hash) => {
        if (hash) {
          let user = {
            username,
            email,
            password: hash,
            otp,
          };

          res.cookie("userData", user);

          res.status(200).send({ msg: "OTP is Sent Please Verify the OTP" });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
});

//verify otp

userRouter.post("/verify", async (req, res) => {
  let { OTP } = req.body;
  const userData = req.cookies.userData;

  console.log(userData);
  try {
    if (userData.otp == OTP) {
      let registered = await UserModel({
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      await registered.save();
      res.status(200).send({ msg: "User Register Successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
});

//Login
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

          res.status(200).send({ msg: "login successfully", token });
        }
      });
    } else {
      res.status(400).send({ msg: "Please register first" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
});

// Logout
userRouter.post("/logout", authentication, async (req, res) => {
  let token = req.headers.authentication;
  // console.log(token);
  try {
    let userToken = await BlacklistModel({ token: token });
    await userToken.save();
    res.status(200).send({ msg: "Logout Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
});

// Reset Password
userRouter.patch("/reset", authentication, async (req, res) => {
  let { password } = req.body;
  let id = req.body.decodedData.id;
  let token = req.headers.authentication;
  // console.log(token);

  try {
    bcrypt.hash(password, 6, async (err, hash) => {
      if (hash) {
        let userData = await UserModel.findByIdAndUpdate(
          { _id: id },
          { password: hash }
        );

        //token blacklisted
        let blacklist = await BlacklistModel({ token });
        await blacklist.save();

        res
          .status(200)
          .send({ msg: "password is reset successfully. Please Login Again" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
});

module.exports = { userRouter };
