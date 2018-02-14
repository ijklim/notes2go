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
import AppNavbar from '@/components/layouts/AppNavbar'
import AppFooter from '@/components/layouts/AppFooter'

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

<style lang="scss">
button:hover,
.clickable:hover {
  cursor: pointer;
}

/* Sweet Alert 2 */
.swal2-container {
  font-family: 'Open Sans';
}
</style>