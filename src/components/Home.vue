<template>
  <v-container grid-list-lg>
    <v-layout row wrap justify-center>
      <note-form />
    </v-layout>
  </v-container>
</template>

<script>
import NoteForm from '@/components/NoteForm'

export default {
  name: 'Home',

  data () {
    return {
    }
  },

  components: {
    NoteForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
