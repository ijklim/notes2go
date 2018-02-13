<template>
  <v-alert
    :color="backgroundColor"
    :dismissible="dismissible"
    :transition="transition"
    v-model="isVisible"
  >
    <v-icon :dark="iconDarkTheme" class="mr-2">{{ icon }}</v-icon>
    {{ text }}
  </v-alert>
</template>

<script>
  const alertProperties = {
    backgroundColor: '',
    dismissible: false,
    icon: '',
    iconDarkTheme: false,
    text: '',
    transition: '',
    isVisible: false
  }

  export default {
    name: 'NoteAlert',

    data () {
      return {
        ...alertProperties
      }
    },
    watch: {
      isVisible: function (data) {
        if (data === false) this.$alert.hide()
      }
    },
    mounted () {
      // Needed as this.$alert.isVisible cannot be monitored using computed value, with or without getter
      setInterval(() => {
        for (let property in alertProperties) {
          this[property] = this.$alert.get(property)
        }
      }, 100)
    }
  }
</script>

<style scoped>
</style>