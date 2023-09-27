const mongoose = require("mongoose")

//schema
const customerSchema = mongoose.Schema({
    name : String,
    contect : String,
    address : String
})


//model

const CustomerModel = mongoose.model("Customer" , customerSchema)

module.exports={CustomerModel}