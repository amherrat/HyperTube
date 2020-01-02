var torrentStream = require('torrent-stream');
var fs = require('fs');
const parseRange = require('range-parser');
var ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpegPath = ffmpegInstaller.path;

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
var engines = [];
var VideoStream = async function (req, res) {
    console.log(req.params.hash);
    var hash = String(req.params.hash).toLowerCase();
    console.log('here!!', hash);
    if (hash && req.method === 'GET') {
        if (hash.match(/([0-9a-f]{6})([0-9a-f]{34})/) && req.headers.range) {
            var engine = torrentStream('magnet:?xt=urn:btih:' + hash, {
                tmp: __dirname,
                trackers: trackers
            });
            engines[hash] = engine;
            await engine.on('ready', () => {
                // get largest file index
                var large = 0;
                for (i = 1; i < engine.files.length; i++)
                    if (engine.files[i].length > engine.files[large].length) large = i;
                // the first file mostly is the video
                const file = engine.files[large];
                //get file ext
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(file.name)[1];
                console.log('file name: ' + file.name);
                console.log(`file ext: ${ext}`);
                file.select();
                var len = file.length;
                console.log(req.headers.range);
                const ranges = parseRange(len, req.headers.range, { combine: true });
                console.log('ranges ', ranges);
                if (ranges.type === 'bytes' && ranges !== -1 && ranges !== -2) {
                    console.log('ranges');
                    const range = ranges[0];
                    res.status(206);
                    if (['mp4', 'webm', 'ogv', 'ogg'].includes(ext)) {
                        res.set({
                            'Accept-Ranges': 'bytes',
                            'Content-Length': 1+range.end - range.start,
                            'Content-Range': `bytes ${range.start}-${range.end}/${len}`
                        });
                        console.log('supported format');
                        res.set({ 'Content-Type': `video/${ext === 'ogv' ? 'ogg' : ext}` })
                        //torrent-stream
                        var stream = file.createReadStream({ start: range.start, end: range.end });
                        stream.pipe(res);
                    } else if (ext === 'mkv'){
                        res.set({
                            'Accept-Ranges': 'bytes',
                            'Content-Length': 1 + range.end - range.start,
                            'Content-Range': `bytes ${range.start}-${range.end}/${len}`
                        });    
                        console.log('unsupported format');
                        console.log(ffmpegInstaller.path, ffmpegInstaller.version);
                        res.set({ 'Content-Type': 'video/webm' })
                        var stream = file.createReadStream();
                        ffmpeg(stream).setFfmpegPath('/Users/adouz/goinfre/ffmpeg')
                        .videoCodec('libvpx')
                        .audioCodec('libvorbis')
                        .format('webm')
                        .audioBitrate(128)
                        .videoBitrate(8000)
                        .outputOptions([
                        //   `-threads ${threads}`,
                          '-deadline realtime',
                          '-error-resilient 1'
                        ])
                        .on('start', function (cmd) {
                            console.log("--- ffmpeg start process ---")
                            console.log(`cmd: ${cmd}`)
                        })
                        .on('end', function () {
                            console.log('Finished processing');
                        })
                        .on('error', function (err) {
                            console.log("--- ffmpeg meets error ---")
                            console.log(err)
                        })
                        .on('progress', function(progress) {
                            console.log("--- ffmpeg progress ---")
                            console.log(progress);
                        })                        
                        .pipe(res, { end: true });
                    }else
                        res.status(415).end(); //415 Unsupported Media Type
                } else {
                    file.createReadStream().pipe(res);
                }
            });
            engine.on('download', function (index) {
                // console.log(engine.swarm.downloaded, '/', engine.files[0].length);
                // console.log("download - " + index);
            });
            engine.on('upload', function (index, offset, length) {
            });
            engine.on('idle', function () {
                console.log('download is done');
            });
            engine.on('error', function (err, info) {
                console.log(err, info);
            });
        } else
            res.end();
    } else
        res.end();
}

module.exports = VideoStream;