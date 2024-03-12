const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  console.log("I am a middleware");
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(404).send("Authorization Header is required");
  }

  const acessToken = req.headers.authorization.split(" ")[1];
  

//   console.log( "acessToken is: ", acessToken);
  

try {
   const decode = jwt.verify(acessToken,process.env.ACCESS_TOKEN_PRIVATE_KEY);
   req._id = decode._id
   next();
} catch (error) {
    return res.status(404).send("Invalid Acess Key");

    //  console.log(error);
}
// next()

  
};
