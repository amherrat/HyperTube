const yifysubtitles = require('@amilajack/yifysubtitles');
const fs = require('fs');

var subtitles = async (req, res) => {
    const imdbid = String(req.params.imdbid).toLowerCase();
<<<<<<< HEAD
=======
    const lang = String(req.query.lang).toLowerCase();
    //console.log(imdbid, lang);
>>>>>>> 91fc238006d0a2c384dccc736ab2e1041a76b24c
    if (imdbid && imdbid.match(/tt\d{7,8}/)) {
        var dir = __dirname + '/../subtitles';
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);
        let ytsres = await yifysubtitles(imdbid, { path: dir, langs: ['en', 'fr', 'ar', 'es'] });
        for (i in ytsres) {
            ytsres[i] = { lang: ytsres[i].lang, langShort: ytsres[i].langShort, path: `/subtitles/${ytsres[i].fileName}` }
        }
        res.status(200).send(ytsres); //200 (OK)
    } else res.status(400).end("imdbid is wrong"); //400 (Bad Request)
}

module.exports = subtitles;
