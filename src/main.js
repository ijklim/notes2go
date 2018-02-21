// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import Vuetify from 'vuetify'
import VueSweetalert2 from 'vue-sweetalert2'

import makeStore from './store'
import makeSnackbar from './modules/snackbar'
import makeAlert from './modules/alert'
import './filters'

import 'vuetify/dist/vuetify.min.css'
import '@/assets/styles.css'

Vue.use(Vuetify)
Vue.use(VueSweetalert2)

// Inject Vue, replace the need to import Vue into snackbar, dependencies are also clearer
const alert = makeAlert(Vue)
const snackbar = makeSnackbar(Vue)
const store = makeStore(Vue, alert, firebase, router, snackbar)

// console.log('[Dev Only]', 'Vue Version: ', Vue.version)
Vue.config.productionTip = false
// Vue.config.devtools = false

/**
 * Initialize Firebase
 */
const _initDB = () => {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  })
}

/**
 * Sign in user anonymously
 */
const _initUser = () => {
  if (firebase.auth().currentUser) return

  firebase.auth().signInAnonymously()
    .catch(error => {
      console.error('Firebase anonymously sign in error, please check Firebase rules', error)
    })
}

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
    _initDB()
    _initUser()
  }
})
