class Getters {
  /**
   * Ensure leaving the current page is acceptable without asking user for confirmation
   */
  canLeaveWithoutConfirmation = state => {
    if (!this.isDataEditable) return true
    if (!state.isDirty) return true
    if (state.skipConfirmationDirty) return true
    return false
  }

  // Code field validation rules: min length
  codeMinLength = () => {
    return 3
  }

  // Code field validation rules: max length
  codeMaxLength = () => {
    return 30
  }

  isDataEditable = state => {
    return (state.mode === 'edit')
  }

  export () {
    return {
      canLeaveWithoutConfirmation: this.canLeaveWithoutConfirmation,
      codeMinLength: this.codeMinLength,
      codeMaxLength: this.codeMaxLength,
      isDataEditable: this.isDataEditable
    }
  }
}

export default function makeGetters () {
  return new Getters().export()
}
