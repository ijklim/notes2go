<template>
  <v-snackbar
    :color="snackbarSetting('backgroundColor')"
    :bottom="true"
    :right="true"
    v-model="visible"
  >
    <span v-if="snackbarSetting('icon')">{{ snackbarSetting('icon') }}</span>
    {{ snackbarSetting('text') }}
    <v-btn flat :color="snackbarSetting('color')" @click.native="visible = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'NoteSnackbar',

    data () {
      return {
        visible: false
      }
    },
    watch: {
      visible: function (data) {
        if (data === false) this.$snackbar.hide()
      }
    },
    methods: {
      snackbarSetting (property) {
        return this.$snackbar.get(property)
      }
    },
    mounted () {
      // Needed as this.$snackbar.isVisible cannot be monitored using computed value, with or without getter
      setInterval(() => {
        this.visible = this.$snackbar.isVisible
      }, 100)
    }
  }
</script>

<style scoped>
</style>