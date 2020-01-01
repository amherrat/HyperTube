const User = require("../models/userModel.js");

function validate_input(email, token) {
  if (email && token) {
    if (
      !String(email).match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi
      ) ||
      email.length > 50
    ) {
      return false;
      
    }
    if (!String(token).match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/) || token.length > 200) {
      return false;
    }
  } else {
    return false;
  }
  return true;
}

function validate_input_passwordreset(email, token) {
  console.log(email,token);
  if (email && token) {
    if (
      !String(email).match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi
        ) ||
        email.length > 50
        ) {  
          return false;
        }
        if (!String(token).match(/^[a-zA-Z0-9]*$/) || token.length > 300) {
          return false;
        }
      } else {
    return false;
  }
  return true;
}

exports.confirm = (req, res) => {
  email = req.body.email;
  token = req.body.token;
  if (!validate_input(email, token)) {
    res.json({
      success: false
      ,msg : "Token or mail not valid"
    });
  } else {
    try {
      User.Validate(email, token)
        .then(result => {
            console.log(result);
            return res.json({
            success: true
          });
        })
        .catch(err => {
            console.log(err);
          return res.json({
            success: false,
            msg : err
          });
        });
    } catch (err) {}
  }
};


exports.confirmresetpassword = (req, res) => {
  email = req.body.email;
  passwdtoken = req.body.passwdtoken;
  if (!validate_input_passwordreset(email, passwdtoken)) {    
    res.json({
      success: false
      ,msg : "Token or mail not valid"
    });
  } else {
    try {
      User.find({mail : email, passwdtoken : passwdtoken})
        .then(result => {
           if(result.length)
            return res.json({
            success: true
             });
             else
             return res.json({
              success: false,
              msg : "User not found or invalid token"
            });
        })
        .catch(err => {
          return res.json({
            success: false,
            msg : err
          });
        });
    } catch (err) {}
  }
};