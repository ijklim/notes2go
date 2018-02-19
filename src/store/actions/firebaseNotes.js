/**
 * Delete note from firebase
 */
export const _deleteNote = function (context, id) {
  let ref = this.firebase.database().ref('notes/' + id)
  ref.once('value')
    .then(snapshot => {
      let valInDB = snapshot.val()
      // id is not in the database
      if (valInDB === null) {
        return this._error(context, `Note does not exist.`)
      }

      ref.remove()

      this._resetFormNote(context)

      this._success(context, 'Note deleted!', '🗑️')
    })
    .catch(error => {
      // Database connection error?
      return this._error(context, `[FB#D] Error encountered: '${error}'`)
    })
}

/**
 * Insert new Note node, ensure `code` is unique
 * @param {Object} context
 * @param {Object} payload
 * @return {Boolean}
 */
export const _insertNote = function (context, payload) {
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
 * Search Notes to find node with code, returns Firebase ref
 * @param {String} code
 * @return {Object}
 */
export const _searchByCode = function (code) {
  // Note: Create index on `code` to prevent Firebase warning and improve query speed
  return this.firebase.database().ref('notes').orderByChild('code').equalTo(code)
}

/**
 * Update Note node, ensure `code` is unique and id is valid
 * @param {Object} context
 * @param {Object} payload
 * @return {Boolean}
 */
export const _updateNote = function (context, payload) {
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
