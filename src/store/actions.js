class Actions {
  constructor (snackbar) {
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

          context.commit('setLoadingFlag', false)
        }, 3000)
      }
    }
  }
}

export default function makeActions (snackbar) {
  return new Actions(snackbar).export()
}
