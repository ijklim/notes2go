<template>
  <v-toolbar class="yellow lighten-4">
    <!-- App Name, top left -->
    <v-toolbar-title>
      <router-link :to="menuHome" router tag="span" class="clickable">{{ appName }}</router-link>
    </v-toolbar-title>
    <v-spacer />

    <!-- Hamburger, top right -->
    <!-- <v-toolbar-side-icon class="hidden-md-and-up" /> -->

    <!-- Search bar: https://vuetifyjs.com/en/components/text-fields#main-toolbar -->
    <v-text-field
      append-icon="search"
      class="toolbar__search mr-2"
      flat
      label="Code search"
      solo-inverted
      v-model="searchText"
      :autofocus="searchAutofocus"
      :append-icon-cb="search"
      @keyup.enter.native="search"
    />

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
        { icon: 'smartphone', title: 'Share', link: '/note' }
      ],
      searchAutofocus: true,
      searchText: ''
    }
  },
  methods: {
    search () {
      this.$store.dispatch('submitSearch', this.searchText)
    }
  }
}
</script>

<style scoped>
.toolbar__search {
  max-width: 250px;
}
</style>
