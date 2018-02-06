<template>
  <v-snackbar
    :color="snackbarSettings.backgroundColor"
    :timeout="snackbarSettings.timeout"
    :bottom="true"
    :right="true"
    v-model="showSnackbar"
  >
    <span v-if="snackbarSettings.icon">{{ snackbarSettings.icon }}</span>
    {{ snackbarSettings.text }}
    <v-btn flat :color="snackbarSettings.color" @click.native="showSnackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'NoteSnackbar',

    data () {
      return {
      }
    },
    computed: {
      snackbarSettings () {
        return this.$store.state.snackbarSettings
      },
      showSnackbar: {
        get: function () {
          return this.snackbarSettings.text !== ''
        },
        set: function (newValue) {
          this.$store.commit('closeSnackbar')
        }
      }
    }
  }
</script>

<style scoped>
</style>