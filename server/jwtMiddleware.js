var jwt = require("jsonwebtoken");
var jwt1 = (req, res, next) => {
  let token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.params.token;
  if (token) {
    try {
      jwt.verify(token, appSecret, (err, decoded) => {
        if (err) {
          //console.log('Failed to authenticate token.');
          // return res.json({
          //     success: false,
          //     message: "Failed to authenticate token."
          // });
          return res.status(401).send("Failed to authenticate token."); //401 (Unauthorized)
        } else {
          req.jwt = decoded;
          next();
        }
      });
    } catch (err) {}
  } else {
    // return res.send({
    //     success: false,
    //     message: "No token Provided."
    // });
    return res.status(400).send("No token Provided."); //400 (Bad Request)
  }
};
// export default jwt1;
module.exports = jwt1;
