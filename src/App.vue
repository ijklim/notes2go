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

<style lang="scss">
/* Hide side scrollbar if content does not need it */
html {
  overflow-y: auto; 
}

/* Change cursor to pointer for any clickable element */
button:hover,
.clickable:hover {
  cursor: pointer;
}

/* Sweet Alert 2 */
.swal2-container {
  font-family: 'Open Sans';
}
</style>