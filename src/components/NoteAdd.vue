<template>
  <!-- <v-speed-dial> -->
    <div class="fab-container">
      <v-tooltip left>
        <v-btn
          color="red"
          dark
          fab
          slot="activator"
          @click="onClick"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
        <span>Start a new note</span>
      </v-tooltip>
    </div>
  <!-- </v-speed-dial> -->
</template>

<script>
  export default {
    name: 'NoteAdd',

    methods: {
      onClick () {
        this.$store.dispatch('startNewNote')
      }
    }
  }
</script>

<style lang="scss" scoped>
$padding-right: 30px;
$padding-bottom: $padding-right + 36px;

.fab-container {
  position: fixed;
  bottom: $padding-bottom;
  right: $padding-right;
}
</style>