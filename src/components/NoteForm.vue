<template>
  <v-flex xs12 sm10 mt-5>
    <v-form>
      <input type="hidden" name="id" :value="id" />
      <input type="hidden" name="key" :value="key" />
      <v-text-field
        label="Code"
        required
        v-model="code"
        :error-messages="errorsCode"
        @input="$v.code.$touch()"
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
        @click="submit"
      >
        <v-icon left>backup</v-icon>
        Save
      </v-btn>
    </v-form>
  </v-flex>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'

  export default {
    name: 'NoteForm',

    mixins: [validationMixin],
    validations: {
      code: { required, maxLength: maxLength(30) },
      notes: { required }
    },

    props: {
      valid: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        id: 0,
        key: '',
        code: '',
        notes: ''
      }
    },

    methods: {
      submit () {
        this.$v.$touch()

        // Failed validation
        if (this.$v.$invalid) return

        // Save form data
        let payload = {
          id: this.id,
          notes: this.notes
        }
        this.$store.commit('submitFormNote', payload)

        // Reset dirty flag
        this.$v.$reset()
      }
    },

    computed: {
      errorsCode () {
        const errors = []
        if (!this.$v.code.$dirty) return errors
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

    watch: {
    },

    mounted () {
      // All fields get defaults from Vuex store
      for (let field in this._data) {
        this[field] = this.$store.state[field]
      }
    }
  }
</script>

<style scoped>
</style>