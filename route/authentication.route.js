const express = require("express")

//customer model
const {CustomerModel} = require("../model/customers.model")

const authRouter = express.Router()


authRouter.get("/" , (req,res)=>{
    res.send("Working")
})

authRouter.post("/register" , async(req,res)=>{
    let {fname,lname,email,password} = req.body

    try {

    let emailCheck = await CustomerModel.findOne({email : email})
    if(emailCheck){
        res.send({msg : "Email ID is already exists. Please go to Login"})
    }else{


        let user = await CustomerModel({fname,lname,email,password})
        await user.save()
        res.status(200).send({msg : "Register Successfully"})

    }




      
    } catch (error) {
        res.send({msg : error})
        console.log(error)
    }
})


module.exports={authRouter}