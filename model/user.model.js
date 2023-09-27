const mongoose = require("mongoose")

//schema
const userSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String
})


//model

const UserModel = mongoose.model("user" , userSchema)

module.exports={UserModel}