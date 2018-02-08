<template>
  <v-alert
    :color="getSetting('backgroundColor')"
    :dismissible="getSetting('dismissible')"
    :icon="getSetting('icon')"
    transition="fade-transition"
    v-model="visible"
  >
    {{ getSetting('text') }}
  </v-alert>
</template>

<script>
  export default {
    name: 'NoteAlert',

    data () {
      return {
        visible: false
      }
    },
    watch: {
      visible: function (data) {
        if (data === false) this.$alert.hide()
      }
    },
    methods: {
      getSetting (property) {
        return this.$alert.get(property)
      }
    },
    mounted () {
      // Needed as this.$snackbar.isVisible cannot be monitored using computed value, with or without getter
      setInterval(() => {
        this.visible = this.$alert.isVisible
      }, 100)
    }
  }
</script>

<style scoped>
</style>