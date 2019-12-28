const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const passport = require('passport')
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

async function start () {
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

  
  // Use Body Parser and Cors
  var jsonParser = bodyParser.json()
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  app.use(jsonParser, urlencodedParser);
  app.use(cors());
  app.get(/%/, (req, res) =>{
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
  
  // Torrent stream
  app.use('/torrent/:hash', require('./TorrentStream'));

  // Give nuxt middleware to express
  app.use(nuxt.render)
  
  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `\x1b[43m\x1b[30mFor\x1b[0m\x1b[41m Magic \x1b[42m on \x1b[0m http://${host}:${port}`,
    badge: true
  })
}

start()
