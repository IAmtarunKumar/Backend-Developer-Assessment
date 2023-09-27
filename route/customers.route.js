const express = require("express");

const { CustomerModel } = require("../model/customer.model");
const { authentication } = require("../config/middleware/authentication.middleware");



const customerRouter = express.Router();

customerRouter.get("/customers",authentication, async (req, res) => {
  try {
    let data = await CustomerModel.find();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
});

customerRouter.post("/customers",authentication,async (req, res) => {
  let payload = req.body;

  try {
    let customer = await CustomerModel(payload);
    await customer.save();

    res.status(200).send({ msg: "Customer register successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
});

module.exports = { customerRouter };
