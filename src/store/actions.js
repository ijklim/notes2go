class Actions {
  constructor (alert, firebase, snackbar) {
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
  _success = (context, text) => {
    // Configure snackbar to show success status
    this.snackbar.set('dismissible', false)
    this.snackbar.set('icon', '💾')
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
          this.searchByCode(payload.code).once('value')
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
                  return this._error(context, `[FB] Update failed: '${error}'`)
                })
            })
            .catch(error => {
              // Database connection error?
              return this._error(context, `[FB] Error encountered: '${error}'`)
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
            return this._error(context, `[FB] Update failed: '${error}'`)
          })
      })
      .catch(error => {
        // Database connection error?
        return this._error(context, `[FB] Error encountered: '${error}'`)
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
    // New Note
    if (payload.id.length === 0) {
      // Firebase .push() returns a promise, results won't be returned by function
      return this._insertNote(context, payload)
    }

    // Update existing Note
    return this._updateNote(context, payload)
  }

  export () {
    return {
      submitFormNote: this.submitFormNote
    }
  }
}

export default function makeActions (alert, firebase, snackbar) {
  return new Actions(alert, firebase, snackbar).export()
}
