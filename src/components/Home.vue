<template>
  <v-container grid-list-lg>
    <v-layout row wrap justify-center>
      <v-flex xs6 sm3>
        <v-btn large success block>New Note</v-btn>
      </v-flex>
      <v-flex xs6 sm3>
        <v-btn large info block>Search Note</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
