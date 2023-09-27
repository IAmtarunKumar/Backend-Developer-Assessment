const express = require("express")

const {CustomerModel} = require("../model/customer.model")

const customerRouter = express.Router()


customerRouter.get("/customers" , async(req,res)=>{
    try {
        let data = await CustomerModel.find()
        res.send(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
    }
})

customerRouter.post("/customers" , async(req,res)=>{
    let payload = req.body

    try {
        let customer = await CustomerModel(payload)
        await customer.save()

        res.send({"msg" : "Customer register successfully"})

    } catch (error) {
            console.error(error);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
    }
})


module.exports={customerRouter}