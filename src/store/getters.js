class Getters {
  export () {
    return {
      // Code field validation rules, min and max length
      codeMinLength: () => {
        return 3
      },
      codeMaxLength: () => {
        return 30
      }
    }
  }
}

export default function makeGetters () {
  return new Getters().export()
}
