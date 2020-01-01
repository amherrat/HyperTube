const mongoose = require("../db/db");
//const crypto = require('crypto');
const bcrypt = require("bcrypt");
const schema = {
  login: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
    dropDups: true
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true
    //,select: false
  },
  fname: { type: mongoose.SchemaTypes.String, required: true },
  lname: { type: mongoose.SchemaTypes.String, /*required: true */},
  mail: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
    dropDups: true
  },
  token: { type: mongoose.SchemaTypes.String, required: true },
  profil: {
    type: mongoose.SchemaTypes.String,
    default: "http://0.0.0.0:3000/default-profile.png"
  },
  FortytowId:{type: mongoose.SchemaTypes.String},
  googleId:{type: mongoose.SchemaTypes.String},
  spotifyId:{type: mongoose.SchemaTypes.String},
  preferedlang: { type: String, default: "en" },
  passwdtoken: {type: String},
  verified: { type: Number, default: 0 }
};
const collectionName = "users";
const userSchema = mongoose.Schema(schema);

userSchema.pre("save", function(next) {
  let user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    return next();
  });
});
userSchema.statics = {
  async userGet(){
    return await this.find({}, ['login', 'profil']);
  },
  getUser(login) {
    return new Promise((resolve, reject) => {
      this.findOne({ login })
        .exec()
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  },
  authenticate(login, password) {
    return new Promise((resolve, reject) => {
      this.findOne({ login })
        .exec()
        .then(user => {
          if (user) {
            if (!user.verified)
              reject({
                error: "mail",
                msg: "Please Validate your account before !"
              });
            bcrypt.compare(password, user.password, (err, result) => {
              if (err || !result)
                reject({
                  error: "password",
                  msg: "Your password is incorrect !"
                });
              resolve(user);
            });
          } else
            reject({ error: "login", msg: "Your username is incorrect !" });
        });
    });
  },
  Validate(mail, token) {
    return new Promise((resolve, reject) => {
      this.findOne({ mail, token })
        .exec()
        .then(user => {
          if (user) {
            if (!user.verified) {
              this.findOneAndUpdate(
                { mail, token },
                { verified: 1 },
                { useFindAndModify: false }
              )
                .exec()
                .then(user => {
                  if (user) resolve("Verified");
                  else reject("Not verified");
                });
            } else reject("Already Verified");
          } else reject("Token or mail doesn't exist");
        });
    });
  },
  ValidateResetPassword(mail, passwdtoken, password) {
    return new Promise((resolve, reject) => {
      this.findOne({ mail, passwdtoken })
        .exec()
        .then(user => {
          if (user) {
            if (!user.verified) {
              this.findOneAndUpdate(
                { mail, passwdtoken },
                { password: password },
                { useFindAndModify: false }
              )
                .exec()
                .then(user => {
                  if (user) resolve("Updated password");
                  else reject("Not updated");
                });
            } else reject("Something went wrong");
          } else reject("Token or mail doesn't exist");
        });
    });
  },
  Passwordreset(mail, passwdtoken) {
    return new Promise((resolve, reject) => {
      this.findOne({ mail })
        .exec()
        .then(user => {
          if (user) {
              this.findOneAndUpdate(
                { mail },
                { passwdtoken: passwdtoken },
                { useFindAndModify: false }
              )
                .exec()
                .then(user => {
                  if (user) resolve("Ready for reset");
                  else reject("Not ready for reset");
                });
          } else reject("No user found");
        });
    });
  }
};
const User = mongoose.model(collectionName, userSchema);
module.exports = User;
