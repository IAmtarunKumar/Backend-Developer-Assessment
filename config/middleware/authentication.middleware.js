const jwt = require("jsonwebtoken")

require("dotenv").config()

let authentication =  (req,res,next)=>{
    let token = req.headers.authentication

    if(token){
        var decoded = jwt.verify(token, process.env.secretKey);
        console.log(decoded)
        if(decoded){
            next
        }else{
            res.send({msg : "Please Login First"})
        }
    }else{
        res.send({msg : "Please Login First"})

    }
}


module.exports={authentication}