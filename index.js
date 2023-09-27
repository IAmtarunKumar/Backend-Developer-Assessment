const express = require("express")
require("dotenv").config()

// Database 
const {connection} = require("./config/db")
//authentication router 
const {authRouter} = require("./route/authentication.route")

const app = express()
app.use(express.json())  //paresed the json data


//Use authRouter
app.use("/api" , authRouter)






app.listen(process.env.port, async()=>{
    try {
        await connection
    console.log("Database is connected")
    } catch (error) {
      console.log(error)  
    }

    console.log(`${process.env.port} port is working`)
})