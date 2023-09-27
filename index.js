const express = require("express");
require("dotenv").config();

// Database
const { connection } = require("./config/database/db");
//authentication router
const { userRouter } = require("./route/user.route");
const { customerRouter } = require("./route/customers.route");
const {authentication} = require("./config/middleware/authentication.middleware");

const app = express();
app.use(express.json()); //paresed the json data

//Use authRouter
app.use("/api", userRouter);

//auth middleware use
app.use(authentication);

//user customer route
app.use("/api", customerRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }

  console.log(`${process.env.port} port is working`);
});
