const mongoose = require("mongoose")

//schema
const userSchema = mongoose.Schema({
    username : {type : String , required : true},
    email : {type : String , required : true},
    password : {type : String , required : true}
})


//model

const UserModel = mongoose.model("user" , userSchema)

module.exports={UserModel}