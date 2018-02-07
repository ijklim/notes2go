class Mutations {
  constructor (snackbar) {
    this.snackbar = snackbar
  }

  export () {
    return {
      submitFormNote: (state, payload) => {
        // console.log(payload)
        this.snackbar.set('backgroundColor', 'success')
        this.snackbar.set('icon', '💾')
        this.snackbar.set('text', 'Saved')
        this.snackbar.set('timeout', 1000)
        this.snackbar.show()
      }
    }
  }
}

export default function makeMutations (snackbar) {
  return new Mutations(snackbar).export()
}
