class Actions {
  constructor (Vue, alert, firebase, snackbar) {
    this.Vue = Vue
    this.alert = alert
    this.firebase = firebase
    this.snackbar = snackbar
  }

  /**
   * Show error alert and clear loading flag
   * Always returns false as error status
   * @param {Object} context
   * @param {Object} payload
   * @return {Boolean}
   */
  _error = (context, text) => {
    this.alert.showError(text)
    context.commit('setLoadingFlag', false)
    return false
  }

  /**
   * Show success snackbar, hide alert and clear loading flag
   * Always returns true as success status
   * @return {Boolean}
   */
  _success = (context, text, icon = '💾') => {
    // Configure snackbar to show success status
    this.snackbar.set('dismissible', false)
    this.snackbar.set('icon', icon)
    this.snackbar.set('text', text)
    this.snackbar.set('timeout', 1000)
    this.snackbar.set('right', false)
    this.snackbar.show()

    this.alert.hide()
    context.commit('setLoadingFlag', false)
    return true
  }

  /**
   * Search Notes to find node with code, returns Firebase ref
   * @param {String} code
   * @return {Object}
   */
  _searchByCode = (code) => {
    // Note: Create index on `code` to prevent Firebase warning and improve query speed
    return this.firebase.database().ref('notes').orderByChild('code').equalTo(code)
  }

  /**
   * Insert new Note node, ensure `code` is unique
   * @param {Object} context
   * @param {Object} payload
   * @return {Boolean}
   */
  _insertNote = (context, payload) => {
    // let ref = this.firebase.database().ref('notes').orderByChild('code').equalTo(payload.code)
    this._searchByCode(payload.code).once('value')
      .then(snapshot => {
        if (snapshot.val() !== null) {
          // Duplicate `code`
          return this._error(context, `Code '${payload.code}' already exists, please select another code`)
        }

        // Attempt to add new Note
        let data = {
          code: payload.code,
          notes: payload.notes,
          dateCreated: (new Date()).toISOString()
        }
        this.firebase.database().ref('notes').push(data)
          .then(result => {
            context.commit({ type: 'set', property: 'id', value: result.key })
            context.commit({ type: 'set', property: 'code', value: payload.code })
            context.commit({ type: 'set', property: 'notes', value: payload.notes })

            return this._success(context, 'Saved')
          })
          .catch(_ => {
            // Most likely permission error, should not happen if data is clean
            return this._error(context, `[FB] Error encountered trying to create a new Note, please try again later`)
          })
      })
      .catch(error => {
        // Database connection error?
        return this._error(context, `[FB] Error encountered: '${error}'`)
      })
  }

  /**
   * Update Note node, ensure `code` is unique and id is valid
   * @param {Object} context
   * @param {Object} payload
   * @return {Boolean}
   */
  _updateNote = (context, payload) => {
    let ref = this.firebase.database().ref('notes/' + payload.id)
    ref.once('value')
      .then(snapshot => {
        let valInDB = snapshot.val()
        // payload.id is not in the database
        if (valInDB === null) {
          return this._error(context, `Note data has been corrupted, please reload.`)
        }

        // Code has been changed
        if (valInDB.code !== payload.code) {
          this._searchByCode(payload.code).once('value')
            .then(snapshot => {
              if (snapshot.val() !== null) {
                // Duplicate `code`
                return this._error(context, `Code '${payload.code}' already exists, please select another code`)
              }

              // Update the code and notes fields
              ref.update(
                {
                  code: payload.code,
                  notes: payload.notes
                }
              )
                .then(_ => {
                  return this._success(context, 'Updated')
                })
                .catch(error => {
                  // Database connection error?
                  return this._error(context, `[FB#UCN] Update failed: '${error}'`)
                })
            })
            .catch(error => {
              // Database connection error?
              return this._error(context, `[FB#S] Error encountered: '${error}'`)
            })

          return
        }

        // Only the notes field has been changed
        ref.update(
          {
            notes: payload.notes
          }
        )
          .then(_ => {
            return this._success(context, 'Updated')
          })
          .catch(error => {
            // Database connection error?
            return this._error(context, `[FB#UN] Update failed: '${error}'`)
          })
      })
      .catch(error => {
        // Database connection error?
        return this._error(context, `[FB#ID] Error encountered: '${error}'`)
      })
  }

  /**
   * Invoked by Notes submission form
   * @param {Object} context
   * @param {Object} payload
   */
  submitFormNote = (context, payload) => {
    context.commit('setLoadingFlag', true)

    // Validate field: code
    if (payload.code.length < context.getters.codeMinLength) {
      return this._error(context, `Code is invalid`)
    }

    // Validate field: notes
    if (payload.notes.length === 0) {
      return this._error(context, `Notes is required`)
    }

    // Ensure data is formatted correctly
    let formattedPayload = Object.assign(
      payload,
      {
        code: this.Vue.filter('formatCode')(payload.code)
      }
    )

    // New Note
    if (payload.id.length === 0) {
      // Firebase .push() returns a promise, results won't be returned by function
      return this._insertNote(context, formattedPayload)
    }

    // Update existing Note
    return this._updateNote(context, formattedPayload)
  }

  /**
   * Search for a note by `code`
   * @param {Object} context
   * @param {String} searchText
   */
  submitSearch = (context, searchText) => {
    let performSearch = () => {
      let code = this.Vue.filter('formatCode')(searchText)
      this._searchByCode(code).once('value')
        .then(snapshot => {
          if (snapshot.val() === null) {
            // Not found
            return this._error(context, `Note '${searchText}' does not exist`)
          }

          // Found Note
          let valInDB = snapshot.val()
          let [ id ] = Object.getOwnPropertyNames(valInDB)
          context.commit({ type: 'set', property: 'id', value: id })
          context.commit({ type: 'set', property: 'code', value: valInDB[id].code })
          context.commit({ type: 'set', property: 'notes', value: valInDB[id].notes })
          context.commit('resetFormStates')
          context.commit({ type: 'set', property: 'formTimestamp', value: (new Date()).getTime() })

          this._success(context, `'${valInDB[id].code}' loaded`, '👍')
        })
        .catch(error => {
          // Database connection error?
          return this._error(context, `[FB] Error encountered: '${error}'`)
        })
    }

    if (context.getters.canLeaveWithoutConfirmation) {
      performSearch()
      return
    }

    // Ask user for confirmation
    this.Vue.swal({
      title: 'Proceed with search?',
      text: 'Changes made have not been saved.',
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, let me save first',
      confirmButtonText: 'Yes'
    })
      .then(result => {
        if (!result.value) return
        performSearch()
      })
  }

  /**
   * Start a new note with blank fields
   */
  startNewNote = (context) => {
    let resetFormNote = () => {
      context.commit('resetFormFields')
      context.commit('resetFormStates')
      context.commit({ type: 'set', property: 'formTimestamp', value: (new Date()).getTime() })
    }

    if (context.getters.canLeaveWithoutConfirmation) {
      resetFormNote()
      return
    }

    // Ask user for confirmation
    this.Vue.swal({
      title: 'Start a new note?',
      text: 'Changes made have not been saved.',
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, let me save first',
      confirmButtonText: 'Yes'
    })
      .then(result => {
        if (!result.value) return
        resetFormNote()
      })
  }

  export () {
    return {
      startNewNote: this.startNewNote,
      submitFormNote: this.submitFormNote,
      submitSearch: this.submitSearch
    }
  }
}

export default function makeActions (Vue, alert, firebase, snackbar) {
  return new Actions(Vue, alert, firebase, snackbar).export()
}
