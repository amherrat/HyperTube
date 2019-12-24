var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => {
  done(err, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "267806991983-kkve11sh8hcjk75tdkdbmhmr7mkt74d9.apps.googleusercontent.com",
      clientSecret: "VyEydk7j4GMtw0XyUSX7YJsE",
      callbackURL: "http://lvh.me:3000/api/auth/google/callback"
    },
    function(accessToken, refreshToken, email, profile, done) {
      // console.log("User ID => ",profile.id);
      // console.log("USER NAME => ",profile.name.givenName[0]+profile.name.familyName);
      // console.log("FIRST NAME => ",profile.name.givenName);
      // console.log("LAST NAME => ",profile.name.familyName);
      // console.log("MAIL => ",profile.emails[0].value);
      // console.log("IMG URL => ",profile.photos[0].value);
      /*Check Values Impo Email fname googleid */
      var user = new User({
        // login: profile.name.givenName[0].toLowerCase() + profile.name.familyName.toLowerCase(),
        login: "u"+String(Math.round(new Date().getTime()/1000)),
        fname: profile.name.givenName,
        lname: profile.name.familyName ? profile.name.familyName : "none",
        mail: profile.emails[0].value,
        password: profile.id,
        profil: profile.photos[0].value,
        googleId: profile.id,
        verified: profile.emails[0].verified
      });
      console.log(user);
      /*Create usere if dosnt exist*/
      try {
        User.find({ mail: user.mail }, (err, result) => {
          if (result.length) {
            if (result[0].googleId === user.googleId) {
              let payload = { user: user.login, userid: result._id };
              let token = jwt.sign(payload, appSecret);
              console.log("Loged in mail using GoogleID section");
              return done(null, token);
            } else if (!result[0].googleId) {
              User.findOneAndUpdate(
                { mail: user.mail, verified: 1 },
                { googleId: user.googleId },
                { useFindAndModify: false }
              )
                .exec()
                .then(user => {
                  console.log("Loged in mail by adding GoogleID section");
                  if(user)
                  {
                    let payload = { user: user.login, userid: result._id };
                    let token = jwt.sign(payload, appSecret);
                    return done(null, token);
                  }else
                    return done("mail already exist but not verified", null);
                });
            }
          } else
            User.find({ login: user.login }, (err, result) => {
              if (result[0]) {
                console.log(result[0].googleId, user.googleId);
                if (result[0].googleId === user.googleId) {
                  let payload = { user: user.login, userid: result._id };
                  let token = jwt.sign(payload, appSecret);
                  console.log(
                    "Loged in login using GoogleId verification section"
                  );
                  return done(null, token);
                } else return done("login already exist", null);
              } else {
                console.log("Loged in new user created section");
                let payload = { user: user.login };
                let token = jwt.sign(payload, appSecret);
                user.token = token;
                user
                  .save()
                  .then(result => {
                    console.log("Connected", result);
                    return done(null, token);
                  })
                  .catch(err => {
                    console.log("PRBLM >>>", err);
                  });
              }
            });
        });
      } catch (err) {
        console.log(err);
      }
    }
  )
);
module.exports = passport;
