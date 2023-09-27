const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../../model/blacklist_token.model");

require("dotenv").config();

let authentication = async (req, res, next) => {
  let token = req.headers.authentication;
  // console.log(token)
  if (token) {
    let tokenData = await BlacklistModel.findOne({ token });
    if (tokenData) {
      res.status(400).send({ msg: "Please login first" });
    } else {
      var decoded = jwt.verify(token, process.env.secretKey);
      req.body.decodedData = decoded;
      console.log(decoded);
      if (decoded) {
        next();
      }
    }
  } else {
    res.status(400).send({ msg: "Please Login First" });
  }
};

module.exports = { authentication };
