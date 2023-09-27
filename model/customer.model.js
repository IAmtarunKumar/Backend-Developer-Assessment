const mongoose = require("mongoose")

//schema
const customerSchema = mongoose.Schema({
    name : {type : String , required : true},
    contect : {type : String , required : true},
    address : {type : String , required : true}
})


//model

const CustomerModel = mongoose.model("Customer" , customerSchema)

module.exports={CustomerModel}