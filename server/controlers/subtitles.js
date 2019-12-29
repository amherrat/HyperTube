// const OpenSubtitles = require('opensubtitles-api');
// const OS = new OpenSubtitles('TemporaryUserAgent');
// var Opensubtitles = require('opensubtitles-js');
const yifysubtitles = require('@amilajack/yifysubtitles');
const fs = require('fs');

var subtitles = async (req, res) => {
    const imdbid = String(req.params.imdbid).toLowerCase();
    if (imdbid.match(/tt\d{7,8}/)) {
        var dir = __dirname + '/../../static/subtitles';
        console.log(dir);
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);
        var ytsres = await yifysubtitles(imdbid, { path: dir, langs: ['en', 'fr', 'ar', 'es'] });
        console.log(ytsres);
        res.send(ytsres);
    } else res.end();
}

module.exports = subtitles;
