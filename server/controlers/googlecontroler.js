var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Users = require('../models/usersmodel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => {
  done(err, user)
})

passport.use(new GoogleStrategy({
      clientID: "267806991983-kkve11sh8hcjk75tdkdbmhmr7mkt74d9.apps.googleusercontent.com",
      clientSecret: "VyEydk7j4GMtw0XyUSX7YJsE",
      callbackURL: "http://lvh.me:3000/api/auth/google/callback"
  },
  function(accessToken, refreshToken,email,profile, done) {
    // console.log("User ID => ",profile.id);
    // console.log("USER NAME => ",profile.name.givenName[0]+profile.name.familyName);
    // console.log("FIRST NAME => ",profile.name.givenName);
    // console.log("LAST NAME => ",profile.name.familyName);
    // console.log("MAIL => ",profile.emails[0].value);
    // console.log("IMG URL => ",profile.photos[0].value);
    var user = {
      user_name : profile.name.givenName[0].toLowerCase()+profile.name.familyName.toLowerCase(),
      user_fname : profile.name.givenName,
      user_lname : profile.name.familyName,
      user_mail : profile.emails[0].value,
      user_password : crypto.createHash('sha256').update(profile.id).digest('hex'),
      user_url : profile.photos[0].value,
      mailverfied : profile.emails[0].verified
    };
    console.log(user);
    /*Create usere if dosnt exist*/
    Users.createUser(user, function (err, users) {
      if (err) {
        console.log("Users.createUser:: SQL ERROR::", err);
        return done(err);
        // return res.end();
      }
      if (users === "mail exist" || users === "username exist") {
        console.log("already exist user");
      }
     /*Connect User*/
     Users.auth(user.user_name, function (err, sqlres) {
      if (err) {
        console.log("Users.auth:: SQL ERROR::", err);
        return done(err);
        //return res.end();
      } else {
        if (sqlres.length) {
          var db_password = sqlres[0].user_password;
          var user_id = sqlres[0].user_id;
          var userpassowrd = user.user_password;
          if (String(db_password).match(userpassowrd)) {
            var db_isverfiy = sqlres[0].mailverfied;
            if (db_isverfiy) {
              let payload = { user: user.user_name, userid: user_id };
              let token = jwt.sign(payload, appSecret);
              console.log("Connected");
              done(null, token);
            } else {
              console.log("Not Connected => Verify mail");
            }
          } else {
            console.log("Not Connected => Wrong password");
          }
        } else {
          console.log("Not Connected => User dosn't exist");
        }
      }
    });
    
    });
   
  }
));
// var CreatAuth = function (user) {
//   return new Promise((resolve, reject) => {
//     await Users.createUser(user, function (err, users) {
//       if (err) {
//         console.log("Users.createUser:: SQL ERROR::", err);
//         return done(err);
//         // return res.end();
//       }
//       if (users === "mail exist" || users === "username exist") {
//         console.log("already exist user");
//       }});
//     /*Connect User*/
//     await Users.auth(user.user_name, function (err, sqlres) {
//       if (err) {
//         console.log("Users.auth:: SQL ERROR::", err);
//         return done(err);
//         //return res.end();
//       } else {
//         if (sqlres.length) {
//           var db_password = sqlres[0].user_password;
//           var user_id = sqlres[0].user_id;
//           var userpassowrd = user.user_password;
//           if (String(db_password).match(userpassowrd)) {
//             var db_isverfiy = sqlres[0].mailverfied;
//             if (db_isverfiy) {
//               let payload = { user: user.user_name, userid: user_id };
//               let token = jwt.sign(payload, appSecret, {
//                 // expiresIn: "25min"
//               });
//               console.log("Connected");
//               return done(token);
//             } else {
//               console.log("Not Connected => Verify mail");
//             }
//           } else {
//             console.log("Not Connected => Wrong password");
//           }
//         } else {
//           console.log("Not Connected => User dosn't exist");
//         }
//       }
//     });
//   })
// };
module.exports = passport;