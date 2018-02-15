/**
 * Global filters for notes2go v1.0.0
 * (c) 2018 Ivan Lim
 * @license MIT
 */
import Vue from 'vue'

// `code` should be in lower case, spaces replaced by .
Vue.filter('formatCode', (value) => {
  if (!value) return ''
  return value.toLowerCase().replace(/ /g, '.')
})

// `notes` for display purpose
Vue.filter('formatNotesForDisplay', (value) => {
  if (!value) return ''
  return value.replace(/\n/g, '<br>')
})
