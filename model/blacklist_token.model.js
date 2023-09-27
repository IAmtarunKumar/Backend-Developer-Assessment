const mongoose = require("mongoose")

//schema
const blacklistSchema = mongoose.Schema({
    token : String
})


//model

const BlacklistModel = mongoose.model("blacklist" , blacklistSchema)

module.exports={BlacklistModel}