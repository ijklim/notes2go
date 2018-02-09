// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import * as firebase from 'firebase/app'
import 'firebase/database'

import router from './router'
import Vuetify from 'vuetify'
import makeStore from './store'
import makeSnackbar from './modules/snackbar'
import makeAlert from './modules/alert'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

// Inject Vue, replace the need to import Vue into snackbar, dependencies are also clearer
const alert = makeAlert(Vue)
const snackbar = makeSnackbar(Vue)
const store = makeStore(Vue, alert, firebase, snackbar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  alert,
  router,
  snackbar,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    })
  }
})
