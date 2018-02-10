<template>
  <v-snackbar
    :color="getSetting('backgroundColor')"
    :top="getSetting('top')"
    :right="getSetting('right')"
    :bottom="getSetting('bottom')"
    :left="getSetting('left')"
    timeout="999999"
    v-model="visible"
  >
    <span v-if="getSetting('icon')" class="mr-3">{{ getSetting('icon') }}</span>
    {{ getSetting('text') }}
    <v-spacer />
    <v-btn flat icon @click.native="visible = false" v-if="getSetting('dismissible')">
      <v-icon :color="getSetting('dismissButtonColor')">cancel</v-icon>
    </v-btn>
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
      getSetting (property) {
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