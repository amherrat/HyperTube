const mongoose = require("../db/db");
var Schema = mongoose.Schema;

var videosSchema = new Schema({
    hash: String,
    imdbid: String,
    last_watch: Date
});

var UsersWatch = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'  
    },
    imdbid: String,
    date: Date
})

var watch = new mongoose.model('watch', UsersWatch);
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
    });
}

exports.addToWatchUser = (data) => {
    var query = { imdbid: data.imdbid, user: data.user },
        options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false },
        update = { date: new Date() };
    watch.findOneAndUpdate(query, update, options, function (err, res) {
        if (err) console.log(err);
    });
}

exports.getWatchUser = (user) => {
    return new Promise((resolve, reject) => {
        watch.find({user: user}, function (err, wtch) {
            if (err) reject(err);
            if (!wtch) reject('user watchedlist is empty');
            resolve(wtch);
        });
    });
}