<template>
  <v-flex xs12 sm10 mt-2>
    <v-card>
      <v-card-text v-html="formattedNotes" v-if="notes" />
      <v-card-text v-else class="text-xs-center py-5">
        <v-progress-circular indeterminate :size="50" color="primary" />
      </v-card-text >
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    name: 'NoteDisplay',

    props: {
      notes: {
        type: String,
        default: ''
      }
    },

    computed: {
      formattedNotes () {
        return this.$root.$options.filters.formatNotesForDisplay(this.notes)
      }
    }
  }
</script>

<style scoped>
</style>