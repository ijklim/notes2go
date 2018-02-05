<template>
  <v-toolbar class="yellow lighten-4">
    <!-- App Name, top left -->
    <v-toolbar-title>
      <router-link :to="menuHome" router tag="span" class="clickable">{{ appName }}</router-link>
    </v-toolbar-title>
    <v-spacer />

    <!-- Hamburger, top right -->
    <v-toolbar-side-icon class="hidden-md-and-up" />

    <!-- Menu items, top right -->
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-for="(menuItem, i) of menuItems" :key="i" :to="menuItem.link" router>
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
      menuHome: '/',
      menuItems: [
        { icon: 'smartphone', title: 'Share', link: '/note' },
        { icon: 'search', title: 'Search', link: '/note' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
