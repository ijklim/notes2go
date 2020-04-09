/**
 * alert v1.1.1
 * (c) 2020 Ivan Lim
 * @license MIT
 */
const defaultProperties = {
  backgroundColor: 'info',
  dismissible: true,
  icon: 'info',
  iconDarkTheme: true,
  resetTimeout: 500,
  text: '',
  timeout: 0,
  transition: 'fade-transition'
}

class Alert {
  constructor () {
    this.state = {
      ...defaultProperties,
      isVisible: false
    }
    this.reset()
  }

  /**
   * Revert properties to default values
   */
  reset = () => {
    Object.assign(this.state, defaultProperties)
  }

  /**
   * Return property value if the property is valid
   * @param {String} property
   * @return {*}
   */
  get = (property) => {
    return this.state[property]
  }

  /**
   * Set property value if the property is valid
   * @param {String} property
   * @param {*} value
   * @return {Boolean}
   */
  set = (property, value) => {
    this.state[property] = value
  }

  /**
   * Show alert
   */
  show = () => {
    this.set('isVisible', true)
    if (this.get('timeout') <= 0) return

    // Auto hide
    setTimeout(() => {
      this.hide()
    }, this.get('timeout'))
  }

  /**
   * Hide alert and reset settings
   */
  hide = () => {
    // Setting isVisible to false should start the fade transition animation within 100ms
    this.set('isVisible', false)

    setTimeout(() => {
      // Without timeout alert will revert to default before it disappears
      this.reset()
    }, this.get('resetTimeout'))
  }

  /**
   * Standard error alert
   */
  showError = (text) => {
    this.set('backgroundColor', `error`)
    this.set('icon', `warning`)
    this.set('text', text)
    this.show()
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
