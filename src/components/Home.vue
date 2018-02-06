<template>
  <v-container grid-list-lg>
    <v-layout row wrap justify-center>
      <note-form />
      <note-snackbar />
    </v-layout>
  </v-container>
</template>

<script>
import NoteForm from '@/components/NoteForm'
import NoteSnackbar from '@/components/NoteSnackbar'

export default {
  name: 'Home',

  data () {
    return {
    }
  },

  components: {
    NoteForm,
    NoteSnackbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
