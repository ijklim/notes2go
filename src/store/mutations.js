class Mutations {
  constructor (defaultFormStates) {
    this.defaultFormStates = defaultFormStates
  }

  /**
   * Reture form states to default values
   */
  setDefaults = (state) => {
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
      setDefaults: this.setDefaults,
      setDirtyFlag: this.setDirtyFlag,
      setLoadingFlag: this.setLoadingFlag,
      setSkipConfirmationDirtyFlag: this.setSkipConfirmationDirtyFlag,
      set: this.set
    }
  }
}

export default function makeMutations (defaultFormStates) {
  return new Mutations(defaultFormStates).export()
}
