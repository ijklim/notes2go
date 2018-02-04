<template>
  <v-toolbar>
    <v-toolbar-title>{{ appName }}</v-toolbar-title>
    <v-spacer />

    <v-toolbar-side-icon class="hidden-md-and-up" />

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-for="(menuItem, i) of menuItems" :key="i">
        <v-icon left>{{ menuItem.icon }}</v-icon>{{ menuItem.title }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppNavbar',
  props: {
    appName: String
  },
  data () {
    return {
      menuItems: [
        { icon: 'smartphone', title: 'Share' },
        { icon: 'close', title: 'Close' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
