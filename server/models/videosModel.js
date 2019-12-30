const mongoose = require("../db/db");
var Schema = mongoose.Schema;

var videosSchema = new Schema({
    hash: String,
    imdbid: String,
    last_watch: Date
});

var video = new mongoose.model('videos', videosSchema);

exports.newVideo = (data) => {
    var query = { hash: data.hash, imdbid: data.imdbid },
        options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false },
        update = { last_watch: new Date() };
    video.findOneAndUpdate(query, update, options, function (error, result) {
        if (error) return;
    });
}

exports.getVideos = () => {
    return new Promise((resolve, reject) => {
        video.find({}, function (err, vid) {
            if (err) reject(err);
            if (!vid) reject("not found/unauthorized");
            resolve(vid);
        })
    });
}

exports.deleteVideo = (hash) => {
    video.deleteOne({ hash: hash }, function (err) {
        if (err) return handleError(err);
        // deleted at most one video document
    });
}