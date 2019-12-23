var express = require('express');
var router = express.Router();
const User = require('./controlers/userscontroler');
const Users = require('./models/userModel.js');
const Images = require('./controlers/imagescontroler');
const Validate = require('./controlers/validatecontroler');
// // var confirm = require('../controlers/confirm');
// // var tagsList = require('../controlers/tagscontroler');
// // var jwt = require('../middleware/jwtMiddleware').jwtMidleware;
const passport = require('./controlers/googlecontroler');
router.post('/signup', User.signup);
router.post('/confirm', Validate.confirm);
router.post('/create_profile_img', Images.create_a_image);
router.post('/authenticate', User.Login);
router.get('/', (req,res)=>{
    //const users = client.db("Hypertube").collection("users");
    //res.send(Users.findOne());
    Users.find({})
    .exec()
    .then(
        result => {
            res.status(200).json(result);
        }
    )
    .catch()
}
);

// router.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile','email'] }));
// router.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     console.log('is here  --> ', req.user);
//     res.render('redirect', { token: req.user });
//   });
// router.post('/Test',(req,res) =>{
//     console.log("HERE",req.body)
//     // const user = new User({
//     //     login : "Kada",
//     //     fname: "Ahmad",
//     //     lname: "Feskati",
//     //     email: "asdasd@log.fr",
//     //     password: "Trythis",
//     //     profil: "URL"
//     // });
//     // user.save().then(
//     //     result => {
//     //         console.log(result);
//     //     }).catch(
//     //     err =>{
//     //         console.log(err);
//     //     })
//     res.status(200).send();
// });


//router.post('/login', User.Login);
// // router.post('/confirm', confirm.confirm);
// // router.post('/resetPasswd', User.reset);
// // router.post('/tags', jwt, tagsList.create_a_tag);
// // router.post('/images', jwt, Images.create_a_image);
// // router.post('/imagesdel', jwt, Images.deleteImage);
// // router.post('/verifyRestPasswd', User.verifyRset);
// // router.post('/changepassword', User.changePassword);
// // router.put('/users/', jwt, User.update_a_user);
// // router.put('/usersaccount/', jwt, User.update_account);
module.exports = router;