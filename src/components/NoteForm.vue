<template>
  <v-flex xs12 sm10 mt-5>
    <v-form>
      <v-text-field
        label="Note Id"
        v-model="id"
        :error-messages="errorsId"
        @input="$v.id.$touch()"
        required
      ></v-text-field>
      <v-text-field
        label="Notes"
        multi-line
        required
        textarea
        v-model="notes"
        :error-messages="errorsNotes"
        @input="$v.notes.$touch()"
        :rows="10"
      ></v-text-field>
      <v-btn block @click="submit" large class="success" :disabled='disableSaveButton'>
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
      id: { required, maxLength: maxLength(30) },
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
        id: '',
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
      errorsId () {
        const errors = []
        if (!this.$v.id.$dirty) return errors
        !this.$v.id.maxLength && errors.push(`Note Id must be at most ${this.$v.id.$params.maxLength.max} characters long`)
        !this.$v.id.required && errors.push('Note Id is required.')
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
      }
    },

    watch: {
    },

    mounted () {
      this.id = this.$store.state.id
      this.notes = this.$store.state.notes
    }
  }
</script>

<style scoped>
</style>