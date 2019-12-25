var passport = require("passport");
const User = require("../models/userModel.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => {
  done(err, user);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: "f060d41c32cc42efa1419205fed2501e",
      clientSecret: "52f7ba2a71664e5ab8e01da7c9370d57",
      callbackURL: 'http://localhost:3000/api/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
         console.log("User ID => ",profile);
      // console.log("USER NAME => ",profile.name.givenName[0]+profile.name.familyName);
      // console.log("FIRST NAME => ",profile.name.givenName);
      // console.log("LAST NAME => ",profile.name.familyName);
      // console.log("MAIL => ",profile.emails[0].value);
      // console.log("IMG URL => ",profile.photos[0].value);
      /*Check Values Impo Email fname spotifyId */
      var user = new User({
        login: profile.username,
        fname: profile.displayName,
        mail: profile.emails[0].value,
        profil: profile.photos[0] ? profile.photos[0].value : "http://" + host + ":3000/default-profile.png",
        password: profile.id+"tkharbi9a",
        spotifyId: profile.id,
        verified: 1 //We should discuss this
      });
      console.log(user);
      /*Create usere if dosnt exist*/
      try {
        User.find({ mail: user.mail }, (err, result) => {
          if (result.length) {
            if (result[0].spotifyId === user.spotifyId) {
              let payload = { user: user.login, userid: result._id };
              let token = jwt.sign(payload, appSecret);
              console.log("Loged in mail using spotifyId section");
              return done(null, token);
            } else if (!result[0].spotifyId) {
              User.findOneAndUpdate(
                { mail: user.mail, verified: 1 },
                { spotifyId: user.spotifyId },
                { useFindAndModify: false }
              )
                .exec()
                .then(user => {
                  console.log("Loged in mail by adding spotifyId section");
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
                console.log(result[0].spotifyId, user.spotifyId);
                if (result[0].spotifyId === user.spotifyId) {
                  let payload = { user: user.login, userid: result._id };
                  let token = jwt.sign(payload, appSecret);
                  console.log(
                    "Loged in login using spotifyId verification section"
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
                    return done("something went wrong", null);
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