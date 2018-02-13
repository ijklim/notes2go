class Mutations {
  setLoadingFlag = (state, value) => {
    state.isLoading = value
  }

  set = (state, payload) => {
    state[payload.property] = payload.value
  }

  export () {
    return {
      setLoadingFlag: this.setLoadingFlag,
      set: this.set
    }
  }
}

export default function makeMutations () {
  return new Mutations().export()
}
