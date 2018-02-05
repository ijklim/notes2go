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
      <v-btn block @click="submit" large class="success">
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

        if (this.$v.$invalid) return

        this.$router.push('/notes')
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
      }
    }
  }
</script>

<style scoped>
</style>