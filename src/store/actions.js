class Actions {
  constructor (alert, snackbar) {
    this.alert = alert
    this.snackbar = snackbar
  }

  export () {
    return {
      submitFormNote: (context, payload) => {
        context.commit('setLoadingFlag', true)

        context.commit('saveFormNote', payload)

        setTimeout(() => {
          // Configure snackbar to show status
          this.snackbar.set('backgroundColor', 'success')
          this.snackbar.set('icon', '💾')
          this.snackbar.set('text', 'Saved')
          this.snackbar.set('timeout', 1000)
          this.snackbar.show()

          // Test alert
          this.alert.set('text', 'hurrah~')
          this.alert.set('timeout', 1000)
          this.alert.show()

          context.commit('setLoadingFlag', false)
        }, 1500)
      }
    }
  }
}

export default function makeActions (alert, snackbar) {
  return new Actions(alert, snackbar).export()
}
