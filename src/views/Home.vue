<template>
  <v-container grid-list-lg>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm10>
        <note-alert />
      </v-flex>
      <note-form />
      <note-snackbar />
      <note-add />
    </v-layout>
  </v-container>
</template>

<script>
import NoteAdd from '@/components/NoteAdd'
import NoteAlert from '@/components/NoteAlert'
import NoteForm from '@/components/NoteForm'
import NoteSnackbar from '@/components/NoteSnackbar'

export default {
  name: 'Home',

  components: {
    NoteAdd,
    NoteAlert,
    NoteForm,
    NoteSnackbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
