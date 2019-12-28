var torrentStream = require('torrent-stream');
var fs = require('fs');
const parseRange = require('range-parser');
var ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
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
// create stream with fs 
// var stream =fs.createReadStream(filepath, {start: start,end: end});
// stream.pipe();
//torrent-stream
var VideoStream = async function (req, res) {
    //1bb1f95ef15df0f6720313166c26eb7773691be3
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
                //var len = fs.statSync(__dirname + '/1280.mkv').size;
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
                        res.set({ 'Content-Type': 'video/webm' })
                        //var filepath = __dirname + '/torrent-stream/' + hash + '/' + file.path;
                        // var filepath = __dirname + '/1280.mkv';
                        // var stream = file.createReadStream({ start: range.start, end: range.end });
                        var stream = file.createReadStream();
                        //var stream = fs.createReadStream(filepath);
                        // stream.pipe(res);
                        //fmpeg converting
                        // var ffmpegStream =  ffmpeg(stream).setFfmpegPath(ffmpegPath);
                        ffmpeg(stream).setFfmpegPath(ffmpegPath)
                        .videoCodec('libvpx')
                        // .outputOptions("-c:v libvpx -crf 10 -b:v 1M -c:a libvorbis")
                        .format('webm')
                        .on('start', function (cmd) {
                            console.log("--- ffmpeg start process ---")
                            console.log(`cmd: ${cmd}`)
                        })
                        .on('end', function () {
                            console.log('Finished processing');
                        })
                        .on('error', function (err) {
                            // console.log("--- ffmpeg meets error ---")
                            // console.log(err)
                        })
                        .on('progress', function(progress) {
                            console.log("--- ffmpeg progress ---")
                            console.log(progress);
                        })                        
                        .pipe(res, { end: true });
                    }else
                        res.status(415).end(); //415 Unsupported Media Type
                    // console.log(filepath);
                    // var stream = fs.createReadStream(filepath, { start: range.start, end: range.end });
                    // if (fs.existsSync(filepath)) {
                    //     // file.createReadStream({ start: range.start, end: range.end });
                    //     console.log('file exists');
                    //     var stream = fs.createReadStream(filepath, { start: range.start, end: range.end });
                    //     stream.pipe(res);
                    // } 
                    // file.createReadStream({ start: range.start, end: range.end });
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
            console.log('valid sha1: ' + hash);
        } else
            res.end();
    } else
        res.end();
}

module.exports = VideoStream;