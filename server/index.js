const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
ip = require("ip");
//const db = require('./db/db');
var bodyParser = require('body-parser')
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
  app.use(jsonParser,urlencodedParser);
  app.use(cors());
  
  // API routes
  app.use('/api', require('./router'));
  
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