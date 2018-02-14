<template>
  <v-flex xs12 sm10 mt-2>
    <v-form>
      <input type="hidden" name="id" :value="id" />
      <v-text-field
        hint="Code must be unique, can be used to retrieve your note later"
        label="Code"
        persistent-hint
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
        v-if="isSaveButtonVisible"
        :disabled='isSaveButtonDisabled'
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

  // Min and Max Length rules need to be initialized even though they are set during mount event
  mixins: [validationMixin],
  validations: {
    code: { required, minLength: {}, maxLength: {} },
    notes: { required }
  },

  data () {
    return {
      mode: '',
      code: '',
      notes: ''
    }
  },

  methods: {
    /**
     * Initialize data fields by retrieving values from Vuex store
     */
    init () {
      for (let field in this.$data) {
        this[field] = this.$store.state[field]
      }
    },

    /**
     * Event triggered by keystroke in `code` field
     */
    onInputCode (value) {
      // Code must be lower case and without space
      this.code = this.$root.$options.filters.formatCode(value)

      // Set $dirty flag of code field
      this.$v.code.$touch()
    },

    /**
     * Submit form, new note or note update
     */
    submit () {
      this.$v.$touch()

      // Failed validation
      if (this.$v.$invalid) return

      // Save form data
      let payload = {
        mode: this.mode,
        id: this.id,
        code: this.$root.$options.filters.formatCode(this.code),
        notes: this.notes
      }
      this.$store.dispatch('submitFormNote', payload)

      // Reset dirty flag of form
      this.$v.$reset()
    }
  },

  computed: {
    id () {
      return (this.$store) ? this.$store.state.id : ''
    },

    errorsCode () {
      const errors = []
      if (!this.$v.code.$dirty) return errors
      !this.$v.code.minLength && errors.push(`Code must be at least ${this.$store.getters.codeMinLength} characters long`)
      !this.$v.code.maxLength && errors.push(`Code must be at most ${this.$store.getters.codeMaxLength} characters long`)
      !this.$v.code.required && errors.push('Code is required.')
      return errors
    },
    errorsNotes () {
      const errors = []
      if (!this.$v.notes.$dirty) return errors
      !this.$v.notes.required && errors.push('Notes field should not be blank.')
      return errors
    },

    isFormDirty () {
      // All editable form fields should have validation rules
      // Loop through all properties in params to retrieve form field names
      // Note: Current Vuelidate does not contain an 'any' field dirty flag, only 'all' fields dirty flag
      for (let property in this.$v.$params) {
        if (this.$v[property].$dirty) return true
      }
      return false
    },
    isSaveButtonDisabled () {
      if (this.$v.$invalid) return true
      if (this.isSaving) return true
      if (this.isFormDirty) return false
      return true
    },
    isSaveButtonVisible () {
      return (this.$store) ? this.$store.getters.isDataEditable : false
    },
    isSaving () {
      return (this.$store) ? this.$store.state.isLoading : false
    }
  },
  watch: {
    id: function (data) {
      this.init()
    },
    isFormDirty: function (data) {
      // Form should not be dirty if data is not editable
      if (!this.$store.getters.isDataEditable) {
        this.$store.commit('setDirtyFlag', false)
        return
      }

      this.$store.commit('setDirtyFlag', data)
    }
  },

  mounted () {
    // All fields get defaults from Vuex store
    this.init()

    // Dynamically set min and max code length to keep logic in getters module
    this.$options.validations.code.minLength = minLength(this.$store.getters.codeMinLength)
    this.$options.validations.code.maxLength = maxLength(this.$store.getters.codeMaxLength)
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