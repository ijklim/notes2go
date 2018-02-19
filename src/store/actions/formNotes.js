/**
 * Reset form by clearing all fields and setting timestamp
 */
export const _resetFormNote = function (context) {
  context.commit('resetFormFields')
  context.commit('resetFormStates')
  context.commit({ type: 'set', property: 'formTimestamp', value: (new Date()).getTime() })
}
