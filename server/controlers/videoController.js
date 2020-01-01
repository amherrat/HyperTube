
var VideoModel = require('../models/videosModel');

exports.NewVideo = (req, res) => {
    var hash = String(req.body.hash).toLowerCase();
    var imdbid = String(req.body.imdbid).toLowerCase();
    var username = String(req.body.username).toLowerCase();
    console.log(req.body);
    if (hash.match(/([0-9a-f]{6})([0-9a-f]{34})/) && imdbid.match(/tt\d{7,8}/)) {
        VideoModel.newVideo({ hash: hash, imdbid: imdbid })
        VideoModel.addToWatchUser({ imdbid: imdbid, user: username });
        res.json({ success: true });
    } else res.json({ success: false });
}

exports.watchedlist = (req, res) => {
    var username = String(req.params.username).toLowerCase();
    VideoModel.getWatchUser(username).then(
        (data) => { 
            console.log(data) 
            res.send(data);
        },
        err => {console.log(err) }
    );
}