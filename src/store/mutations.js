class Mutations {
  constructor (snackbar) {
    this.snackbar = snackbar
  }

  export () {
    return {
      submitFormNote: (state, payload) => {
        // console.log(payload)
        state.isLoading = true

        this.snackbar.set('backgroundColor', 'success')
        this.snackbar.set('icon', '💾')
        this.snackbar.set('text', 'Saved')
        this.snackbar.set('timeout', 1000)
        this.snackbar.show()

        setTimeout(() => {
          state.isLoading = false
        }, 3000)
      }
    }
  }
}

export default function makeMutations (snackbar) {
  return new Mutations(snackbar).export()
}
