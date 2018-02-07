// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store'
import snackbar from './modules/snackbar'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(snackbar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  snackbar,
  template: '<App/>',
  components: { App }
})
