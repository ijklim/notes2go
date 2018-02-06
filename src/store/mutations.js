export const submitFormNote = (state, payload) => {
  // console.log(payload)
  state.snackbarText = '💾 Saved'
}

export const closeSnackbar = state => {
  state.snackbarText = ''
}
