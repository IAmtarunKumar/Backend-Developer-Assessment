const mongoose = require("mongoose")

//schema
const customerSchema = mongoose.Schema({
    fname : String,
    lname : String,
    email : String,
    password : String
})


//model

const CustomerModel = mongoose.model("Customer" , customerSchema)

module.exports={CustomerModel}