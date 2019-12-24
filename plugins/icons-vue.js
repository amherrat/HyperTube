// import Vue from 'vue'
// import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faSpinner, faUserSecret } from '@fortawesome/free-solid-svg-icons'
 
// library.add(faSpinner, faUserSecret)
// Vue.component('font-awesome-icon', FontAwesomeIcon)

import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
// This is important, we are going to let Nuxt.js worry about the CSS
//config.autoAddCss = false
 
// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(fas)
library.add(fab)
library.add(far)
// Register the component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)