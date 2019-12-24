var express = require('express');
var router = express.Router();
const User = require('./controlers/userscontroler');
const Users = require('./models/userModel.js');
const Images = require('./controlers/imagescontroler');
const Validate = require('./controlers/validatecontroler');
//var jwt = require('../middleware/jwtMiddleware').jwtMidleware;
const passport = require('./controlers/googlecontroler');

router.post('/signup', User.signup);
router.post('/confirm', Validate.confirm);
router.post('/create_profile_img', Images.create_a_image);
router.post('/authenticate', User.Login);

router.get('/userdata/:login', User.userdata);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('is here  --> ', req.user);
    res.render('redirect', { token: req.user });
  });
module.exports = router;