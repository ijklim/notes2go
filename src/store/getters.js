class Getters {
  // Code field validation rules: min length
  codeMinLength = () => {
    return 3
  }

  // Code field validation rules: max length
  codeMaxLength = () => {
    return 30
  }

  export () {
    return {
      codeMinLength: this.codeMinLength,
      codeMaxLength: this.codeMaxLength
    }
  }
}

export default function makeGetters () {
  return new Getters().export()
}
