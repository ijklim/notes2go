import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  id: '',
  notes: ''
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
