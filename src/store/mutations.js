class Mutations {
  export () {
    return {
      setLoadingFlag: (state, value) => {
        state.isLoading = value
      },
      saveFormNote: (state, payload) => {
        console.log(payload)
      }
    }
  }
}

export default function makeMutations () {
  return new Mutations().export()
}
