var torrentStream = require('torrent-stream');
var fs = require('fs');
const parseRange = require('range-parser');

// recommended trackers
var trackers = [
    'udp://open.demonii.com:1337/announce',
    'udp://tracker.openbittorrent.com:80',
    'udp://tracker.coppersurfer.tk:6969',
    'udp://glotorrents.pw:6969/announce',
    'udp://tracker.opentrackr.org:1337/announce',
    'udp://torrent.gresille.org:80/announce',
    'udp://p4p.arenabg.com:1337',
    'udp://tracker.leechers-paradise.org:6969'
]
// create stream with fs 
// var stream =fs.createReadStream(filepath, {start: start,end: end});
// stream.pipe();

//torrent-stream
var VideoStream = async function (req, res) {
    var hash = String(req.params.hash).toLowerCase();
    console.log('here!!', hash);
    if (hash && req.method === 'GET') {
        if (hash.match(/([0-9a-f]{6})([0-9a-f]{34})/) && req.headers.range) {
            var engine = torrentStream('magnet:?xt=urn:btih:' + hash, {
                tmp: __dirname,
                trackers: trackers
            });
            await engine.on('ready', () => {
                // get largest file index
                var large = 0;
                for (i = 1; i < engine.files.length; i++)
                    if (engine.files[i].length > engine.files[large].length) large = i;
                // the first file mostly is the video
                const file = engine.files[large];
                file.select();
                console.log('selected file: ' + file.name);
                var len = file.length;
                // res.set('Accept-Ranges', 'bytes');
                // res.setHeader('Content-Length', len);
                console.log(req.headers.range);
                const ranges = parseRange(len, req.headers.range, { combine: true });
                console.log('ranges ', ranges);
                if (ranges === -1)
                    console.log('ranges -1 signals a malformed header string');
                if (ranges === -2)
                    console.log('ranges -2 signals an unsatisfiable range');
                if (ranges.type !== 'bytes')
                    console.log('ranges -1');
                if (ranges.length > 1)
                    console.log('ranges.length > 1');
                if (ranges.type === 'bytes' && ranges !== -1 && ranges !== -2) {
                    const range = ranges[0];
                    res.status(206);
                    res.set({
                        'Accept-Ranges': 'bytes',
                        'Content-Length': 1 + range.end - range.start,
                        'Content-Range': `bytes ${range.start}-${range.end}/${len}`
                    });
                    var filepath = __dirname + '/torrent-stream/' + hash + '/' + file.path;
                    console.log(filepath);
                    // if (fs.existsSync(filepath)) {
                    //     // file.createReadStream({ start: range.start, end: range.end });
                    //     console.log('file exists');
                    //     var stream = fs.createReadStream(filepath, { start: range.start, end: range.end });
                    //     stream.pipe(res);
                    // } 
                    var stream = file.createReadStream({ start: range.start, end: range.end });
                    stream.pipe(res);
                } else {
                    file.createReadStream().pipe(res);
                }
            });
            engine.on('download', function (index) {
                console.log(engine.swarm.downloaded, '/', engine.files[0].length);
                console.log("download - " + index);
            });
            engine.on('upload', function (index, offset, length) {
            });
            engine.on('idle', function () {
                console.log('download is done');
            });
            engine.on('error', function (err, info) {
                console.log(err, info);
            });
            console.log('valid sha1: ' + hash);
        } else
            res.end();
    } else
        res.end();
}

module.exports = VideoStream;