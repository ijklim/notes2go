export const submitFormNote = (state, payload) => {
  // console.log(payload)
  state.snackbarSettings.backgroundColor = 'success'
  state.snackbarSettings.icon = '💾'
  state.snackbarSettings.text = 'Saved'
  state.snackbarSettings.timeout = 1000
}

// Revert snackbar settings to default values
export const closeSnackbar = state => {
  state.snackbarSettings = Object.assign({}, state.defaultSnackbarSettings)
}
