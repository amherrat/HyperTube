var passport = require("passport");
const User = require("../models/userModel.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
var FortyTwoStrategy = require('passport-42').Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => {
  done(err, user);
});

passport.use(new FortyTwoStrategy({
    clientID: "bf3bdf030b47874704dec6f256b7852dc837281d92822685e83972f85ef884b1",
    clientSecret: "d8f8f3e7e60f7f043c5e74708cfdf261e5f93d8b740d9af911f435bafd3e9960",
    callbackURL: "http://localhost:3000/api/auth/42/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      //    console.log("User ID => ",profile.id);
      // console.log("USER NAME => ",profile.name.givenName[0]+profile.name.familyName);
      // console.log("FIRST NAME => ",profile.name.givenName);
      // console.log("LAST NAME => ",profile.name.familyName);
      // console.log("MAIL => ",profile.emails[0].value);
      // console.log("IMG URL => ",profile.photos[0].value);
      var user = new User({
        // login: profile.name.givenName[0].toLowerCase() + profile.name.familyName.toLowerCase(),
        login: "u"+String(Math.round(new Date().getTime()/1000)),
        fname: profile.name.givenName,
        lname: profile.name.familyName ? profile.name.familyName : "none",
        mail: profile.emails[0].value,
        password: profile.id+"tkharbi9a",
        profil: profile.photos[0].value,
        FortytowId: profile.id,
        verified: 1 //we will consider 42 and spotify as verfied :/
      });
      //console.log(user);
      /*Create usere if dosnt exist*/
      try {
        User.find({ mail: user.mail }, (err, result) => {
          if (result.length) {
            if (result[0].FortytowId === user.FortytowId) {
              let payload = { user: result[0].login, userid: result[0]._id };
              let token = jwt.sign(payload, appSecret);
              //console.log("Loged in mail using FortytowId section");
              return done(null, token);
            } else if (!result[0].FortytowId) {
              User.findOneAndUpdate(
                { mail: user.mail, verified: 1 },
                { FortytowId: user.FortytowId },
                { useFindAndModify: false }
              )
                .exec()
                .then(userRes => {
                  // console.log("Loged in mail by adding FortytowId section");
                  if(userRes)
                  {
                    let payload = { user: userRes.login, userid: userRes._id };
                    let token = jwt.sign(payload, appSecret);
                    return done(null, token);
                  }else
                    return done("mail already exist but not verified", null);
                });
            }
          } else
            User.find({ login: user.login }, (err, result) => {
              if (result[0]) {
                // console.log(result[0].FortytowId, user.FortytowId);
                if (result[0].FortytowId === user.FortytowId) {
                  let payload = { user: result[0].login, userid: result[0]._id };
                  let token = jwt.sign(payload, appSecret);
                  //console.log("Loged in login using FortytowId verification section");
                  return done(null, token);
                } else return done("login already exist", null);
              } else {
                //console.log("Loged in new user created section");
                let payload = { user: user.login };
                let token = jwt.sign(payload, appSecret);
                user.token = token;
                user
                  .save()
                  .then(result => {
                    //console.log("Connected", result);
                    return done(null, token);
                  })
                  .catch(err => {
                    //console.log("PRBLM >>>", err);
                    return done("something went wrong", null);
                  });
              }
            });
        });
      } catch (err) {
        //console.log(err);
      }
    }
  )
);
module.exports = passport;
