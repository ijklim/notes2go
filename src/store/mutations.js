class Mutations {
  setLoadingFlag = (state, value) => {
    state.isLoading = value
  }

  saveFormNote = (state, payload) => {
    console.log(payload)
  }

  export () {
    return {
      setLoadingFlag: this.setLoadingFlag,
      saveFormNote: this.saveFormNote
    }
  }
}

export default function makeMutations () {
  return new Mutations().export()
}
