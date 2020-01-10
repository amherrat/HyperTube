const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const passport = require('passport')
const path = require('path')
ip = require("ip");
app.set('view engine', 'ejs');
app.use(passport.initialize());
const bodyParser = require('body-parser')
const cors = require('cors');
global.appSecret = "Hyperwebappsecret";
global.host = ip.address();
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
var fs = require('fs');
var cron = require('node-cron');
var rimraf = require("rimraf");
var videosModel = require('./models/videosModel');
var timeout = require('express-timeout-handler');

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  
  // Timeout
  var options = {
    onTimeout: function(req, res) {
      console.log('Timed out..');
      res.status(408).send('408 Request Timeout.');
    }
  };
  app.use(timeout.handler(options)); 
  
  // Torrent stream
  app.use('/torrent/:hash', require('./TorrentStream'));

  // Use Body Parser and Cors
  var jsonParser = bodyParser.json()
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  app.use(jsonParser, urlencodedParser);
  app.use(cors());
  app.get(/%/, (req, res) => {
    res.redirect('/');
  });
  app.use((err, req, res, next) => {
    // This check makes sure this is a JSON parsing issue, but it might be
    // coming from any middleware, not just body-parser:
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      //console.error(err);
      return res.sendStatus(400); // Bad request
      //return res.end();
    }
    next();
  });

  // API routes
  app.use('/api', require('./router'));

  //remove unwatched videos for 30days or more (0 0 * * *) => everyday at midnight
  cron.schedule('0 0 * * *', () => {
    // last time watched from database
    var videos = videosModel.getVideos();
    videos.then((res) => {
      for (var key in res) {
        var file = __dirname + '/torrent-stream/' + res[key].hash;
        // console.log(res[key]);
        var diffrent_in_time = new Date().getTime() - new Date(res[key].last_watch).getTime();
        var diffrent_in_days = diffrent_in_time / (1000 * 3600 * 24);
        // console.log(`${file} opened for ${diffrent_in_days} day`);
        if (Math.floor(diffrent_in_days) >= 30) {
          if (fs.existsSync(file))
            rimraf.sync(file);
          videosModel.deleteVideo(res[key].hash);
        }
      }
    },
      (err) => {
        console.log(err);
      }
    );
  });
  // Completely remove all saved data for this torrent
  // engine.remove(function (params) {
  //   console.log('remove');
  //   console.log(params);
  // });


  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `\x1b[43m\x1b[30mFor\x1b[0m\x1b[41m Magic \x1b[42m on \x1b[0m http://${host}:${port}`,
    badge: true
  })
}

const dir = path.join(__dirname , './uploads');
app.use('/uploads', express.static(dir));

const subDir = path.join(__dirname , './subtitles');
app.use('/subtitles', express.static(subDir));

start()
