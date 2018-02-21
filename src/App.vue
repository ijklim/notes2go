<template>
  <v-app light>
    <app-navbar v-bind='{appName}' />
    
    <v-content>
      <router-view/>
    </v-content>

    <app-footer />    
  </v-app>
</template>

<script>
import AppNavbar from '@/views/layouts/AppNavbar'
import AppFooter from '@/views/layouts/AppFooter'

export default {
  name: 'app',

  data () {
    return {
      appName: 'notes2go'
    }
  },

  components: {
    AppNavbar,
    AppFooter
  }
}
</script>

<style>
</style>