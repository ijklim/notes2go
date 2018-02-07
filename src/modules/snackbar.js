/**
 * snackbar v1.0.0
 * (c) 2018 Ivan Lim
 * @license MIT
 */
class Snackbar {
  constructor () {
    this.isVisible = false
    this.reset()
  }

  /**
   * Revert properties to default values
   */
  reset () {
    this._backgroundColor = 'default'
    this._color = 'white'
    this._icon = ''
    this._text = ''
    this._timeout = 3000
  }

  /**
   * Return property value if the property is valid
   * @param {String} property
   * @return {*}
   */
  get (property) {
    // if (property === 'isVisible') return this.isVisible
    if (this.hasOwnProperty('_' + property)) return this['_' + property]
    return null
  }

  /**
   * Set property value if the property is valid
   * @param {String} property
   * @param {*} value
   * @return {Boolean}
   */
  set (property, value) {
    if (this.hasOwnProperty('_' + property)) {
      this['_' + property] = value
      return true
    }
    return false
  }

  /**
   * Show snackbar
   */
  show () {
    this.isVisible = true
    if (this.get('timeout') > 0) {
      setTimeout(() => {
        this.hide()
      }, this.get('timeout'))
    }
  }

  /**
   * Hide snackbar and reset settings
   */
  hide () {
    this.isVisible = false
    this.reset()
  }
}

/**
 * Factory function to create Snackbar class object
 * @param {Object} Vue
 * @return {Object<Snackbar>}
 */
export default function makeSnackbar (Vue) {
  // Add this.$snackbar to all Vue components
  Vue.mixin({
    beforeCreate () {
      const options = this.$options
      if (options.snackbar) {
        this.$snackbar = options.snackbar
      } else if (options.parent && options.parent.$snackbar) {
        this.$snackbar = options.parent.$snackbar
      }
    }
  })

  return new Snackbar()
}
