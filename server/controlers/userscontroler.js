const User = require("../models/userModel.js");
var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
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
        user.login.length > 30 ||
        user.login.length < 3
      )
        errors = ({error: "login",msg : "login is invalid"});
      //first name check
      if (
        !String(user.fname).match(
          /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
        ) ||
        user.fname.length > 30
      )
        errors = ({error: "fname",msg : "First name is invalid"});
      //last name check
      if (
        !String(user.lname).match(
          /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
        ) ||
        user.lname.length > 30
      )
      errors = ({error: "lname",msg : "Last name is invalid"});
      //check password
      if (
        !String(user.password).match(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,30}$/g
        ) ||
        user.password.length > 30
      )
      errors=({error:"password",msg:"password invalid"});
      //check mail
      if (
        !String(user.mail).match(
          /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/
        ) ||
        user.mail.length > 50
      )
      errors = ({error: "mail",msg : "Email is invalid"});
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
        errors=({error:"login",msg:"login invalid"});
      }
      if (
        !String(data.password).match(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,30}$/g
        ) ||
        data.password.length > 30
      ) {
        errors=({error:"password",msg:"password invalid"});
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
  if (data.login && data.oldpassword && data.mail) {
    if (
      !String(data.login).match(/^[a-z]+([_-]?[a-z0-9])*$/g) ||
      data.login.length > 30 ||
      data.login.length < 3
    ) {
      errors = ({error: "login",msg : "login is invalid"});
    }
    if (
      !String(data.oldpassword).match(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/g
      ) ||
      data.oldpassword.length > 30
    ) {
      errors=({error:"password",msg:"password invalid"});
    }
    if (
      !String(data.mail).match(
        /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/
      ) ||
      data.mail.length > 50
    ) {
      errors = ({error: "mail",msg : "Email is invalid"});
    }
    if (data.password) {
      if (
        !String(data.password).match(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,30}$/g
        ) ||
        data.password.length > 30
      )
      errors=({error:"password",msg:"password invalid"});
    }
  } else errors.fields = "one of fields is Empty.";
  return errors;
}

exports.list_all_users = function(req, res) {
  try {
    Users.getAllUsers(function(err, users) {
      if (err) res.send(err);
      //console.log('res', users);
      res.send(users);
    });
  } catch (err) {}
};

exports.Login = function(req, res) {
  var user = req.body;
  var errors = validate_login(user);
  if (Object.keys(errors).length != 0) {
    return res.json({
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
          token : token
        });
      },
      err => {
        return res.json({
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
    return res.json({
      success: false,
      errors: errors
    });
  else
    try {
      User.find({ login: new_user.login }, (err, result) => {
        if (result.length)
          return res.json({
            success: false,
            errors: "login already exist"
          });
        else
          User.find({ mail: new_user.mail }, (err, result) => {
            if (result.length)
              return res.json({
                success: false,
                errors: "mail already exist"
              });
            else {
              let payload = {user: new_user.login};
              let token = jwt.sign(payload, appSecret);
              new_user.token = token;
              new_user
                .save()
                .then(result => {
                  //send mail to new user
                  var link ="http://"+host+":3000/verify?t=" +token +"&u=" +new_user.mail;
                  var sbj = "HyperTube | Confirm Your E-mail";
                  var msg =
                    'Please click link below to verify your E-mail:</br><a href="' +
                    link +
                    '">Click Here</a><br>Or Open this link on your browser:<br>' +
                    link;
                  send_mail(new_user.mail, sbj, msg); // sending email to user
                  return res.json({
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

var usersupdate = function(users) {
  if (users.user_name) this.user_name = users.user_name.toLowerCase();
  if (users.user_password)
    this.user_password = require("crypto")
      .createHash("sha256")
      .update(users.user_password)
      .digest("hex");
  if (users.user_mail) this.user_mail = users.user_mail;
};

exports.update_account = function(req, res) {
  var userid = req.jwt.userid;
  var username = req.jwt.user;
  var users = new usersupdate(req.body);
  var passwd = req.body.user_oldpassword;
  //console.log("Tried");
  var errors = validate_update(req.body);
  if (Object.keys(errors).length != 0)
    return res.json({
      success: false,
      errors: errors
    });
  else {
    try {
      Users.authID(userid, function(err, sqlres) {
        if (err) {
          //console.log("Users.auth:: SQL ERROR::", err);
          return res.end();
        } else {
          if (sqlres.length) {
            var db_password = sqlres[0].user_password;
            var userpassowrd = require("crypto")
              .createHash("sha256")
              .update(passwd)
              .digest("hex");
            if (
              String(db_password).match(userpassowrd) &&
              username === sqlres[0].user_name
            ) {
              try {
                Users.auth(users.user_name, (err, sqlres1) => {
                  //console.log('res1');
                  //console.log(sqlres1);
                  if (err) return res.end();
                  else if (sqlres1.length) {
                    //console.log('xe');
                    if (sqlres1[0].user_name !== username)
                      //not his username
                      return res.json({
                        username: username,
                        reason: "taken username",
                        success: true
                      });
                  }
                  //console.log('ge');
                  try {
                    Users.updateById(userid, users, function(err, sqlres) {
                      //console.log('res');
                      //console.log(sqlres);
                      if (err) {
                        return res.json({
                          success: false
                        });
                      }
                      if (sqlres.affectedRows) {
                        // token
                        let payload = { user: users.user_name, userid: userid };
                        let token = jwt.sign(payload, appSecret, {
                          expiresIn: "25min"
                        });
                        return res.json({
                          username: users.user_name,
                          token: token,
                          success: true
                        });
                      }
                    });
                  } catch (err) {}
                });
              } catch (err) {}
            } else {
              return res.json({
                success: false
              });
            }
          }
        }
      });
    } catch (err) {}
  }
};

exports.update_a_user = function(req, res) {
  var users = new Users(req.body);
  var userId = req.jwt.userid;
  //data = nonull(users);
  var errors = is_validForUpdate(req.body);
  //console.log(errors);
  if (Object.keys(errors).length != 0)
    return res.json({
      success: false,
      errors: errors
    });
  else {
    try {
      Users.updateById(userId, users, function(err, sqlres) {
        if (err) {
          return res.json({
            success: false
          });
        }
        //console.log(users);
        //console.log();
        if (sqlres.affectedRows)
          return res.json({
            success: true
          });
        else
          return res.json({
            success: false
          });
      });
    } catch (err) {}
  }
};

exports.reset = (req, res) => {
  var email = req.body.email;
  if (
    !String(email).match(
      /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/
    ) ||
    email.length > 50
  ) {
    res.end("invalid email");
  } else {
    var token = require("crypto")
      .randomBytes(48)
      .toString("hex");
    var link = "http://" + host + ":3000/reset?t=" + token + "&e=" + email;
    var sbj = "Matcha | Reset your password";
    var msg =
      '</br><a href="' +
      link +
      '">Click Here</a> To Rest your password <br> OR Copy this link to your Browser:<br>' +
      link;
    try {
      Users.resetpassword(email, token, (err, sqlres) => {
        if (err) res.end();
        //console.log(sqlres);
        if (sqlres.affectedRows) {
          //console.log('sending email...');
          send_mail(email, sbj, msg);
          res.send("sent");
        } else {
          res.send("not found");
        }
      });
    } catch (err) {}
  }
};

exports.verifyRset = (req, res) => {
  var email = req.body.email;
  var token = req.body.token;
  if (
    !String(email).match(
      /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/
    ) ||
    email.length > 50
  ) {
    res.end("invalid email");
  } else if (!String(token).match(/^[a-zA-Z0-9]*$/) || token.length > 300) {
    res.end("invalid token");
  } else {
    try {
      Users.verifyRset(email, token, (err, sqlres) => {
        if (err) res.end();
        if (sqlres.length) {
          res.send("valid");
        } else {
          res.send("unvalid");
        }
      });
    } catch (err) {}
  }
};

exports.changePassword = (req, res) => {
  var email = req.body.email;
  var token = req.body.token;
  var password = req.body.password;
  if (
    !String(email).match(
      /^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/
    ) ||
    email.length > 50
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
    var newpass = require("crypto")
      .createHash("sha256")
      .update(password)
      .digest("hex");
    try {
      Users.changePassword(email, token, newpass, (err, sqlres) => {
        if (err) res.end();
        if (sqlres.affectedRows) res.send("done");
        else res.send("error");
      });
    } catch (err) {}
  }
};

exports.Addlastconnection = username => {
  try {
    Users.Addlastconnection(username, (err, res) => {
      if (err) return;
      return res;
    });
  } catch (err) {}
};
exports.Getlastconnection = async username => {
  var last;
  try {
    await Users.Getlastconnection(username).then(
      res => {
        last = res[0].last_connection;
      },
      err => {
        /*console.log(err)*/
      }
    );
  } catch (err) {}
  return last;
};
