var express = require('express');
var router = express.Router();
const User = require('./controlers/userscontroler');
const Images = require('./controlers/imagescontroler');
const Comment = require('./controlers/commentController');
const Validate = require('./controlers/validatecontroler');
const Googlepassport = require('./controlers/googlecontroler');
const FortyTwopassport = require('./controlers/42controler');
const Spotifypassport = require('./controlers/spotifycontroler');
const jwttoken = require('./jwtMiddleware');
router.post('/signup', User.signup);
router.post('/confirm', Validate.confirm);
router.post('/resetpassword', User.resetpassword);
router.post('/confirmresetpassword', Validate.confirmresetpassword);
router.post('/changepassword', User.changePassword);
router.post('/create_profile_img',jwttoken, Images.create_a_image);
router.put('/update', jwttoken, User.update_account);
router.put('/updatepassword', jwttoken, User.update_account_password);
router.post('/authenticate', User.Login);
router.get('/userdata/:login', User.userdata);

router.get('/whoAmi/:token', jwttoken, (req, res) => {
  console.log(req.jwt);
  res.json({
    success: true,
    data: req.jwt
  });
});

router.post('/comment/add', jwttoken, Comment.commentAdd);
router.get('/comment/get/:token/:id_film/:hash_film', jwttoken, Comment.commentGet);
router.get('/comment/get/:username', Comment.commentCount);
//router.get('/comment/tata/:token', jwttoken);

/*Google*/
router.get('/auth/google', Googlepassport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', Googlepassport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    console.log('is here  --> ', req.user);
    res.render('redirect', { token: req.user });
  });
/*42*/
router.get('/auth/42', FortyTwopassport.authenticate('42'));
router.get('/auth/42/callback', FortyTwopassport.authenticate('42', { failureRedirect: '/login' }),
  function (req, res) {
    res.render('redirect', { token: req.user });
  });
/*Spotify*/
router.get('/auth/spotify', Spotifypassport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private'],
  showDialog: true
}));

router.get('/auth/spotify/callback', Spotifypassport.authenticate('spotify', { failureRedirect: '/login' }),
  function (req, res) {
    res.render('redirect', { token: req.user });
  });
// Subtitles
router.get('/subtitles/:imdbid', jwttoken, require('./controlers/subtitles'));
//add video
router.post('/addvideo', jwttoken, require('./controlers/videoController').NewVideo);
//watchlist
router.get('/watchedlist/:username', jwttoken, require('./controlers/videoController').watchedlist);

module.exports = router;
