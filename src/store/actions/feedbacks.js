/**
 * Show error alert and clear loading flag
 * Always returns false as error status
 * @param {Object} context
 * @param {Object} payload
 * @return {Boolean}
 */
export const _error = function (context, text) {
  this.alert.showError(text)
  context.commit('setLoadingFlag', false)
  return false
}

/**
 * Show success snackbar, hide alert and clear loading flag
 * Always returns true as success status
 * @return {Boolean}
 */
export const _success = function (context, text, icon = '💾') {
  // Configure snackbar to show success status
  this.snackbar.set('dismissible', false)
  this.snackbar.set('icon', icon)
  this.snackbar.set('text', text)
  this.snackbar.set('timeout', 1000)
  this.snackbar.set('right', false)
  this.snackbar.show()

  this.alert.hide()
  context.commit('setLoadingFlag', false)
  return true
}
