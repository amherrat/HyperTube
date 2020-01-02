const User = require("../models/userModel.js");
var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
/** 
STMP Configuration 
**/
var stmp = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "hypertube1337",
    pass: "Amine10@"
  }
});

function send_mail(mail, sbj, msg) {
  mailOptions = {
    to: mail,
    subject: sbj,
    html: msg
  };
  try {
    stmp.sendMail(mailOptions, (err, res) => {
      if (err) {
        //console.log("stmp.sendMail Error:", err);
        return "error";
      } else {
        return "sent";
      }
    });
  } catch (err) {}
}

function validate_signup(user) {
  ////console.log(users);
  const errors = {};
  if (user) {
    if (user.login && user.fname && user.lname && user.password && user.mail) {
      //user_name check
      if (
        !String(user.login).match(/^[a-z]+([_-]?[a-z0-9])*$/g) ||
        user.login.length > 15 ||
        user.login.length < 3
      )
        errors = { error: "login", msg: "login is invalid" };
      //first name check
      if (
        !String(user.fname).match(
          /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
        ) ||
        user.fname.length > 30
      )
        errors = { error: "fname", msg: "First name is invalid" };
      //last name check
      if (
        !String(user.lname).match(
          /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
        ) ||
        user.lname.length > 30
      )
        errors = { error: "lname", msg: "Last name is invalid" };
      //check password
      if (
        !String(user.password).match(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,30}$/g
        ) ||
        user.password.length > 30
      )
        errors = { error: "password", msg: "password invalid" };
      //check mail
      if (
        !String(user.mail).match(
          /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/
        ) ||
        user.mail.length > 50
      )
        errors = { error: "mail", msg: "Email is invalid" };
    } else errors.error = "one of fields is Empty.";
  } else {
    errors.error = "empty request";
  }
  return errors;
}

function validate_login(data) {
  let errors = {};
  if (data) {
    if (data.login && data.password) {
      if (
        !String(data.login).match(/^[a-z]+([_-]?[a-z0-9])*$/g) ||
        data.login.length > 30 ||
        data.login.length < 3
      ) {
        errors = { error: "login", msg: "login invalid" };
      }
      if (
        !String(data.password).match(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,30}$/g
        ) ||
        data.password.length > 30
      ) {
        errors = { error: "password", msg: "password invalid" };
      }
    } else {
      errors.error = "one of fields is Empty.";
    }
  } else {
    errors.error = "empty request";
  }
  return errors;
}

function validate_update(data) {
  let errors = {};
  if (data.login && data.fname && data.lname && data.mail) {
    //login check
    if (
      !String(data.login).match(/^[a-z]+([_-]?[a-z0-9])*$/g) ||
      data.login.length > 30 ||
      data.login.length < 3
    ) {
      errors = { error: "login", msg: "login is invalid" };
    }
    //first name check
    if (
      !String(data.fname).match(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
      ) ||
      data.fname.length > 30
    )
      errors = { error: "fname", msg: "First name is invalid" };
    //last name check
    if (
      !String(data.lname).match(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
      ) ||
      data.lname.length > 30
    )
      errors = { error: "lname", msg: "Last name is invalid" };
    //mail check
    if (
      !String(data.mail).match(
        /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/
      ) ||
      data.mail.length > 50
    ) {
      errors = { error: "mail", msg: "Email is invalid" };
    }
  } else errors.fields = "one of fields is Empty.";
  return errors;
}

function validate_update_password(data) {
  let errors = {};
  if (data.oldpassword && data.password) {
    if (
      !String(data.oldpassword).match(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/g
      ) ||
      data.oldpassword.length > 30
    ) {
      errors = { error: "password", msg: "password invalid" };
    }
    if (data.password) {
      if (
        !String(data.password).match(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/g
        ) ||
        data.password.length > 30
      )
        errors = { error: "password", msg: "password invalid" };
    }
  } else errors.fields = "one of fields is Empty.";
  return errors;
}

// exports.list_all_users = function(req, res) {
//   try {
//     Users.getAllUsers(function(err, users) {
//       if (err) res.send(err);
//       //console.log('res', users);
//       res.send(users);
//     });
//   } catch (err) {}
// };

exports.Login = function(req, res) {
  var user = req.body;
  var errors = validate_login(user);
  if (Object.keys(errors).length != 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }
  try {
    User.authenticate(user.login, user.password).then(
      result => {
        let payload = { user: user.login, userid: result._id };
        let token = jwt.sign(payload, appSecret);
        return res.status(200).json({
          success: true,
          token: token
        });
      },
      err => {
        return res.status(200).json({
          success: false,
          errors: err
        });
      }
    );
  } catch (err) {}
};

exports.signup = function(req, res) {
  var new_user = new User(req.body);
  var errors = validate_signup(req.body);
  if (Object.keys(errors).length != 0)
    return res.status(400).json({
      success: false,
      errors: errors
    });
  else
    try {
      User.find({ login: new_user.login }, (err, result) => {
        if (result.length)
          return res.status(200).json({
            success: false,
            errors: "login already exist"
          });
        else
          User.find({ mail: new_user.mail }, (err, result) => {
            if (result.length)
              return res.status(200).json({
                success: false,
                errors: "mail already exist"
              });
            else {
              let payload = { user: new_user.login };
              let token = jwt.sign(payload, appSecret);
              new_user.token = token;
              new_user
                .save()
                .then(result => {
                  //send mail to new user
                  var link =
                    "http://" +
                    host +
                    ":3000/verify?t=" +
                    token +
                    "&u=" +
                    new_user.mail;
                  var sbj = "HyperTube | Confirm Your E-mail";
                  var msg =
                    'Please click link below to verify your E-mail:</br><a href="' +
                    link +
                    '">Click Here</a><br>Or Open this link on your browser:<br>' +
                    link;
                  send_mail(new_user.mail, sbj, msg); // sending email to user
                  return res.status(201).json({
                    success: true,
                    signup: result
                  });
                })
                .catch(err => {
                  console.log("PRBLM >>>", err);
                });
            }
          });
      });
    } catch (err) {}
};

exports.update_account = function(req, res) {
  var login = req.jwt.user;
  var newuser = req.body;
  var errors = validate_update(newuser);
  if (Object.keys(errors).length != 0)
    return res.status(200).json({
      success: false,
      errors: errors
    });
  else {
    try {
      User.find({ login: login }, (err, result) => {
        if (result.length) {
          User.find({ login: newuser.login }, (err, resultus) => {
            if (!resultus.length || resultus[0].login === login) {
              User.find({ mail: newuser.mail }, (err, result) => {
                if (!result.length || result[0].login === login) {
                  User.findOneAndUpdate(
                    { login: login },
                    {
                      login: newuser.login,
                      fname: newuser.fname,
                      lname: newuser.lname,
                      mail: newuser.mail
                    },
                    { useFindAndModify: false }
                  )
                    .exec()
                    .then(userRes => {
                      if (userRes) {
                        let payload = { user: newuser.login };
                        let token = jwt.sign(payload, appSecret);
                        return res.status(201).json({
                          success: true,
                          update: token
                        });
                      } else {
                        return res.status(200).json({
                          success: false,
                          errors: "something went wrong"
                        });
                      }
                    });
                } else
                  return res.status(200).json({
                    success: false,
                    errors: "mail already exist"
                  });
              });
            } else
              return res.status(200).json({
                success: false,
                errors: "login already exist"
              });
          });
        } else
          return res.status(200).json({
            success: false,
            errors: "user dosn't exist"
          });
      });
    } catch (err) {}
  }
};

exports.update_account_password = function(req, res) {
  var login = req.jwt.user;
  var password = req.body;
  var errors = validate_update_password(password);
  if (Object.keys(errors).length != 0)
    return res.status(200).json({
      success: false,
      errors: errors
    });
  else {
    try {
      User.authenticate(login, password.oldpassword).then(
        result => {
          if (result) {
            User.findOneAndUpdate(
              { login: login },
              {
                password: password.password
              },
              { useFindAndModify: false }
            )
              .exec()
              .then(userRes => {
                if (userRes) {
                  return res.status(201).json({
                    success: true,
                    update: "password successfully updated"
                  });
                } else {
                  return res.status(200).json({
                    success: false,
                    errors: "something went wrong"
                  });
                }
              });
          }
        },
        err => {
          return res.status(200).json({
            success: false,
            errors: err
          });
        }
      );
    } catch (err) {}
  }
};

exports.resetpassword = (req, res) => {
  var mail = req.body.mail;
  if (
    !String(mail).match(
      /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/
    ) ||
    mail.length > 50
  ) {
    res.end("invalid email");
  } else {
    var token = require("crypto").randomBytes(48).toString("hex");
    var link = "http://0.0.0.0:3000/reset?t=" + token + "&e=" + mail;
    var sbj = "Hypertube | Reset your password";
    var msg =
      '</br><a href="' +
      link +
      '">Click Here</a> To Rest your password <br> OR Copy this link to your Browser:<br>' +
      link;
    try {      
      User.Passwordreset(mail, token).then(result => {
        if (result === "Ready for reset") {
          send_mail(mail, sbj, msg);
          return res.send("sent");
        } else {
          return res.send("not found");
        }
      }).catch(err => {
        console.log(err);
        return res.send("not found");});
    } catch (err) {}
  }
};

// exports.verifyRset = (req, res) => {
//   var email = req.body.email;
//   var token = req.body.token;
//   if (
//     !String(email).match(
//       /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/
//     ) ||
//     email.length > 50
//   ) {
//     res.end("invalid email");
//   } else if (!String(token).match(/^[a-zA-Z0-9]*$/) || token.length > 300) {
//     res.end("invalid token");
//   } else {
//     try {
//       Users.verifyRset(email, token, (err, sqlres) => {
//         if (err) res.end();
//         if (sqlres.length) {
//           res.send("valid");
//         } else {
//           res.send("unvalid");
//         }
//       });
//     } catch (err) {}
//   }
// };

exports.changePassword = (req, res) => {
  var mail = req.body.mail;
  var token = req.body.token;
  var password = req.body.password;
  if (
    !String(mail).match(
      /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/
    ) ||
    mail.length > 50
  ) {
    res.end("invalid email");
  } else if (!String(token).match(/^[a-zA-Z0-9]*$/) || token.length > 300) {
    res.end("invalid token");
  } else if (
    !String(password).match(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/g
    ) ||
    password.length > 30
  ) {
    res.end("invalid password");
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return next(err);
      password = hash;
      console.log(password);
        try {
          User.ValidateResetPassword(mail, token, password)
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
    });
  }
};

exports.userdata = (req, res) => {
  var login = req.params.login.toLowerCase();
  if (!login) {
    return res.status(400).json({
      success: false,
      error: "username undefined"
    });
  } else if (
    !String(login).match(/^[a-z]+([_-]?[a-z0-9])*$/g) ||
    login.length > 50
  ) {
    return res.status(400).json({
      success: false,
      error: "username is wrong"
    });
  }
  try {
    User.findOne({ login: login }).then(result => {
      console.log(result);
      if (result) {
        return res.status(200).json({
          success: true,
          data: { user: result }
        });
      } else
        return res.status(200).json({
          success: false,
          error: "user not found!"
        });
    });
  } catch (err) {}
};
