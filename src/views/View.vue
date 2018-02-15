<template>
  <v-container grid-list-lg>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm10>
        <note-alert />
      </v-flex>
      {{ notes }}
      <note-snackbar />
      <note-add />
    </v-layout>
  </v-container>
</template>

<script>
import NoteAdd from '@/components/NoteAdd'
import NoteAlert from '@/components/NoteAlert'
import NoteSnackbar from '@/components/NoteSnackbar'

export default {
  name: 'Home',

  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    notes () {
      return (this.$store) ? this.$store.state.notes : ''
    }
  },

  components: {
    NoteAdd,
    NoteAlert,
    NoteSnackbar
  },

  mounted () {
    if (this.id && this.$store) this.$store.dispatch('viewNote', this.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
