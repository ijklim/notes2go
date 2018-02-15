class Mutations {
  constructor (defaultFormFields, defaultFormStates) {
    this.defaultFormFields = defaultFormFields
    this.defaultFormStates = defaultFormStates
  }

  /**
   * Reture form fields to default values
   */
  resetFormFields = (state) => {
    for (let property in this.defaultFormFields) {
      state[property] = this.defaultFormFields[property]
    }
  }

  /**
   * Reture form states to default values
   */
  resetFormStates = (state) => {
    for (let property in this.defaultFormStates) {
      state[property] = this.defaultFormStates[property]
    }
  }

  setDirtyFlag = (state, value) => {
    state.isDirty = value
  }

  setLoadingFlag = (state, value) => {
    state.isLoading = value
  }

  setSkipConfirmationDirtyFlag = (state, value) => {
    state.skipConfirmationDirty = value
  }

  set = (state, payload) => {
    state[payload.property] = payload.value
  }

  export () {
    return {
      resetFormFields: this.resetFormFields,
      resetFormStates: this.resetFormStates,
      setDirtyFlag: this.setDirtyFlag,
      setLoadingFlag: this.setLoadingFlag,
      setSkipConfirmationDirtyFlag: this.setSkipConfirmationDirtyFlag,
      set: this.set
    }
  }
}

export default function makeMutations (defaultFormFields, defaultFormStates) {
  return new Mutations(defaultFormFields, defaultFormStates).export()
}
