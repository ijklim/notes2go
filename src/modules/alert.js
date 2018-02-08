/**
 * alert v1.0.0
 * (c) 2018 Ivan Lim
 * @license MIT
 */
class Alert {
  constructor () {
    this.isVisible = false
    this.reset()
  }

  /**
   * Revert properties to default values
   */
  reset () {
    this._backgroundColor = 'error'
    this._color = 'white'
    this._dismissible = true
    this._icon = 'warning'
    this._text = ''
    this._timeout = 0
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
   * Show alert
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
   * Hide alert and reset settings
   */
  hide () {
    this.isVisible = false
    this.reset()
  }
}

/**
 * Factory function to create Alert class object
 * @param {Object} Vue
 * @return {Object<Alert>}
 */
export default function makeAlert (Vue) {
  // Add this.$alert to all Vue components
  Vue.mixin({
    beforeCreate () {
      const options = this.$options
      if (options.alert) {
        this.$alert = options.alert
      } else if (options.parent && options.parent.$alert) {
        this.$alert = options.parent.$alert
      }
    }
  })

  return new Alert()
}
