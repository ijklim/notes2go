<template>
  <v-flex xs12 sm10 mt-5>
    <v-form>
      <input type="hidden" name="id" :value="id" />
      <v-text-field
        label="Code"
        required
        v-if="mode === 'edit'"
        v-model="code"
        :error-messages="errorsCode"
        @input="onInputCode"
      ></v-text-field>
      <v-text-field
        label="Notes"
        multi-line
        required
        textarea
        v-model="notes"
        :error-messages="errorsNotes"
        :rows="10"
        @input="$v.notes.$touch()"
      ></v-text-field>
      <v-btn
        block
        class="success"
        large
        v-if="showSaveButton"
        :disabled='disableSaveButton'
        :loading="isSaving"
        @click="submit"
      >
        Save
      </v-btn>
    </v-form>
  </v-flex>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'NoteForm',

  mixins: [validationMixin],
  validations: {
    code: { required, minLength: minLength(3), maxLength: maxLength(30) },
    notes: { required }
  },

  data () {
    return {
      mode: '',
      id: 0,
      code: '',
      notes: '',
      isSaving: false
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      this.isSaving = true

      // Failed validation
      if (this.$v.$invalid) return

      // Save form data
      let payload = {
        id: this.id,
        key: this.key,
        code: this.formatCode(this.code),
        notes: this.notes
      }
      this.$store.commit('submitFormNote', payload)

      // Reset dirty flag of form
      this.$v.$reset()
      this.isSaving = false
    },
    onInputCode (value) {
      // Code must be lower case and without space
      this.code = this.formatCode(value)

      // Set $dirty flag of code field
      this.$v.code.$touch()
    },
    formatCode (value) {
      // Code must be lower case and without space
      return value.toLowerCase().replace(' ', '.')
    }
  },

  computed: {
    errorsCode () {
      const errors = []
      if (!this.$v.code.$dirty) return errors
      !this.$v.code.minLength && errors.push(`Code must be at least ${this.$v.code.$params.minLength.min} characters long`)
      !this.$v.code.maxLength && errors.push(`Code must be at most ${this.$v.code.$params.maxLength.max} characters long`)
      !this.$v.code.required && errors.push('Code is required.')
      return errors
    },
    errorsNotes () {
      const errors = []
      if (!this.$v.notes.$dirty) return errors
      !this.$v.notes.required && errors.push('Notes field should not be blank.')
      return errors
    },
    disableSaveButton () {
      if (this.$v.$invalid) return true
      if (this.isSaving) return true

      // Loop through all properties in params to retrieve field names
      // If any field is dirty, enable Save button
      for (let property in this.$v.$params) {
        if (this.$v[property].$dirty) return false
      }

      // Form is clean
      return true
    },
    showSaveButton () {
      // Note is View only if id > 0 and key is blank
      if (this.id > 0 && this.key === '') return false

      return true
    }
  },

  mounted () {
    // All fields get defaults from Vuex store
    for (let field in this.$data) {
      this[field] = this.$store.state[field]
    }
  }
}
</script>

<style scoped>
@-moz-keyframes loader {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}
@-webkit-keyframes loader {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}
@-o-keyframes loader {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}
@keyframes loader {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}
</style>