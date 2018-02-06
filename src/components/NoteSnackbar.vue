<template>
  <v-snackbar
    :color="snackbarBackgroundColor"
    :timeout="timeout"
    :bottom="true"
    :right="true"
    v-model="showSnackbar"
  >
    {{ snackbarText }}
    <v-btn flat :color="snackbarTextColor" @click.native="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'NoteSnackbar',

    props: {
      valid: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        snackbarBackgroundColor: 'primary',
        snackbarTextColor: 'white',
        timeout: 1500
      }
    },
    computed: {
      snackbarText () {
        return this.$store.state.snackbarText
      },
      showSnackbar: {
        get: function () {
          return this.$store.state.snackbarText !== ''
        },
        set: function (newValue) {
          this.$store.commit('closeSnackbar')
        }
      }
    },

    mounted () {
    }
  }
</script>

<style scoped>
</style>