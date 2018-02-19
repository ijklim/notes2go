let feedbacks = require('./actions/feedbacks')
let firebaseNotes = require('./actions/firebaseNotes')
let formNotes = require('./actions/formNotes')

class Actions {
  constructor (Vue, alert, firebase, router, snackbar) {
    this.Vue = Vue
    this.alert = alert
    this.firebase = firebase
    this.router = router
    this.snackbar = snackbar
  }

  // Note: Using arrow functions within external modules will prevent `this` from working
  _error = feedbacks._error
  _success = feedbacks._success

  _resetFormNote = formNotes._resetFormNote

  _deleteNote = firebaseNotes._deleteNote
  _insertNote = firebaseNotes._insertNote
  _searchByCode = firebaseNotes._searchByCode
  _updateNote = firebaseNotes._updateNote

  /**
   * Delete current note
   */
  deleteNote = (context) => {
    // Ask user for confirmation
    this.Vue.swal({
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      text: 'Once deleted, note cannot be recovered.',
      title: 'Delete note?',
      type: 'warning'
    })
      .then(result => {
        if (!result.value) return

        this._deleteNote(context, context.state.id)
      })
  }

  /**
   * Open dialog box, show View Only link and button to copy link to clipboard
   */
  shareNote = (context) => {
    let inputClass = 'view-only-link'
    this.Vue.swal(
      {
        confirmButtonText: 'Copy Link',
        input: 'text',
        inputClass,
        inputValue: context.getters.linkViewOnly,
        showCloseButton: true,
        title: 'Share with others',
        type: 'info'
      }
    )
      .then(result => {
        if (!result.value) return

        let input = document.querySelector('.' + inputClass)
        input.select()
        document.execCommand('Copy')

        this._success(context, 'Link copied to clipboard!', '📋')
      })
  }

  /**
   * Start a new note with blank fields
   */
  startNewNote = (context) => {
    if (context.getters.canLeaveWithoutConfirmation) {
      this._resetFormNote(context)
      this._success(context, 'New note ready', '⭐')
      return
    }

    // Ask user for confirmation
    this.Vue.swal({
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, let me save first',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      text: 'Changes made have not been saved.',
      title: 'Start a new note?',
      type: 'warning'
    })
      .then(result => {
        if (!result.value) return
        this._resetFormNote(context)
        this._success(context, 'New note ready', '⭐')
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
          // Reture to home page, which allows edit
          this.router.push('/')

          // Load data into Vuex store
          let valInDB = snapshot.val()
          let [ id ] = Object.getOwnPropertyNames(valInDB)
          context.commit('resetFormFields')
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
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, let me save first',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      text: 'Changes made have not been saved.',
      title: 'Proceed with search?',
      type: 'warning'
    })
      .then(result => {
        if (!result.value) return
        performSearch()
      })
  }

  /**
   * Search for a note by `id`, if found, note will be view only
   */
  viewNote = (context, id) => {
    let ref = this.firebase.database().ref('notes/' + id)
    ref.once('value')
      .then(snapshot => {
        let valInDB = snapshot.val()
        // id is not in the database
        if (valInDB === null) {
          return this._error(context, `Note does not exist.`)
        }

        // Found Note
        context.commit('resetFormFields')
        context.commit({ type: 'set', property: 'id', value: id })
        context.commit({ type: 'set', property: 'notes', value: valInDB.notes })
        context.commit('resetFormStates')
        context.commit({ type: 'set', property: 'mode', value: 'View' })
        context.commit({ type: 'set', property: 'formTimestamp', value: (new Date()).getTime() })

        this.alert.hide()
        context.commit('setLoadingFlag', false)
      })
      .catch(error => {
        // Database connection error?
        return this._error(context, `[FB#R] Error encountered: '${error}'`)
      })
  }

  export () {
    return {
      deleteNote: this.deleteNote,
      shareNote: this.shareNote,
      startNewNote: this.startNewNote,
      submitFormNote: this.submitFormNote,
      submitSearch: this.submitSearch,
      viewNote: this.viewNote
    }
  }
}

export default function makeActions (Vue, alert, firebase, router, snackbar) {
  return new Actions(Vue, alert, firebase, router, snackbar).export()
}
