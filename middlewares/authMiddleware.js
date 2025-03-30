const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token)
    console.log("Authorization Header:", req.headers["authorization"]);
    if(JWT.verify(token,process.env.JWT_SECRET)){
      const decode = JWT.verify(token,process.env.JWT_SECRET);
      console.log(decode)
      req.body.userId = decode.id;
      next();
    }
    else{
      console.log(error);
      res.status(401).send({
        message: "Auth Failed",
        success: false,
      });
    }
  } catch (error) {
    console.log("36")
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};

 