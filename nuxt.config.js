const bodyParser = require('body-parser')
module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - HyperTube',
    // title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'bootstrap-css-only/css/bootstrap.min.css',
    'mdbvue/lib/css/mdb.min.css',
    'element-ui/lib/theme-chalk/index.css'
    // { src: 'at-ui-style', lang: 'css' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/mdb-vue',
    '@/plugins/icons-vue', '~/plugins/xgplayer', '~/plugins/vmodal','~/plugins/element-vue','~/plugins/axios', '~/plugins/i18n'],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  serverMiddleware: [
    bodyParser.json()
  ],
  /*
  ** Nuxt.js modules
  */
  modules: ['nuxt-buefy',
    '@nuxtjs/axios'
  ],
  buefy: { css: false },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) { }
    //,
    //  transpile: [
    //    'mdbvue/lib/components'
    //  ]
  }
}
