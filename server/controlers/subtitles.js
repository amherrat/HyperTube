const OpenSubtitles = require('opensubtitles-api');
const OS = new OpenSubtitles('TemporaryUserAgent');
// const OpenSubtitles = new OS({
//     useragent:'UserAgent',
//     ssl: true
// });

var subtitles = async (req, res) => {
    const imdbid = req.params.imdbid;
    console.log(imdbid);
    await OS.search({
        imdbid: imdbid
        // sublanguageid: 'fre'
        // gzip: true  
    }).then((subtitles) => {
        res.send(subtitles);
    }).catch(err => { console.log(`opensubtitles-api Error: ${err}`) });
}

module.exports = subtitles;
