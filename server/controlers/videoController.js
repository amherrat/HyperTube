
var VideoModel = require('../models/videosModel');

exports.NewVideo = (req, res) => {
    var hash = String(req.body.hash).toLowerCase();
    var imdbid = String(req.body.imdbid).toLowerCase();
    if (hash.match(/([0-9a-f]{6})([0-9a-f]{34})/) && imdbid.match(/tt\d{7,8}/)) {
        VideoModel.newVideo({ hash: hash, imdbid: imdbid })
        res.json({ success: true });
    } else res.json({ success: false });
}