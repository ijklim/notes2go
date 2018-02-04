<template>
  <v-app>
    <app-navbar v-bind='{appName}' />
    
    <v-content>
      <router-view/>
    </v-content>

    <app-footer />    
  </v-app>
</template>

<script>
import AppNavbar from './components/layouts/AppNavbar'
import AppFooter from './components/layouts/AppFooter'

export default {
  name: 'app',
  components: {
    AppNavbar,
    AppFooter
  },
  data () {
    return {
      appName: 'notes2go'
    }
  }
}
</script>

<style lang="scss">
button:hover {
  cursor: pointer;
}
</style>
