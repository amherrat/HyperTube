import Vue from 'vue'
import VueXgplayer from 'vue-xgplayer'

Vue.use(VueXgplayer, {
  // globalOptions
  enterLogo: {
    url: '../Hbrand.png',
    width: 200,
    height: 60
  },
  playsinline: true
})
