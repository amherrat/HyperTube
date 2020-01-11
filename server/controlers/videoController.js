
var VideoModel = require('../models/videosModel');
var UserModel = require('../models/userModel');

exports.NewVideo = (req, res) => {
    var hash = String(req.body.hash).toLowerCase();
    var imdbid = String(req.body.imdbid).toLowerCase();
    var user = req.body.user;
    //console.log(req.body);
    if (hash.match(/([0-9a-f]{6})([0-9a-f]{34})/) && imdbid.match(/tt\d{7,8}/)) {
        VideoModel.newVideo({ hash: hash, imdbid: imdbid })
        VideoModel.addToWatchUser({ imdbid: imdbid, user: user });
        res.status(200).json({ success: true }); //OK
    } else res.status(400).end("hash or imdbid is wrong"); //Bad Request
}

exports.watchedlist = async (req, res) => {
    // var username = String(req.params.username).toLowerCase();
    var user = req.params.username;
    if (user.match(/^[a-z]+([_-]?[a-z0-9])*$/g) && user.length < 50) {
    let usr = await UserModel.getUser(user);
    VideoModel.getWatchUser(usr).then(
        (data) => {
            //console.log(data)
            res.status(200).send(data); //OK
        },
        err => {
            //console.log(err)
            res.status(404).end(err); //Not found
        }
    );
    }else res.status(400).end("username is wrong"); //Bad Request
}