class Snackbar {
  constructor () {
    this.reset()
  }

  // Required, automatically invoked by Vue.use injecting Vue as first argument
  install (Vue) {
    Vue.mixin({
      beforeCreate () {
        const options = this.$options
        // console.log(options)
        if (options.snackbar) {
          this.$snackbar = options.snackbar
        } else if (options.parent && options.parent.$snackbar) {
          this.$snackbar = options.parent.$snackbar
        }
      }
    })
  }

  /**
   * Revert properties to default values
   */
  reset () {
    this.backgroundColor = 'default'
    this.color = 'white'
    this.icon = ''
    this.text = ''
    this.timeout = 3000
  }

  set (property, value) {
    this[property] = value
  }
}

export default new Snackbar()
