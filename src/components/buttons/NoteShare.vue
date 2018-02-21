<template>
  <v-tooltip bottom>
    <v-btn icon slot="activator" @click="onClick" v-if="showIcon">
      <v-icon :color="color">share</v-icon>
    </v-btn>
    <span>Share</span>
  </v-tooltip>
</template>

<script>
  export default {
    name: 'NoteShare',

    props: {
      color: {
        type: String,
        default: 'white'
      }
    },
    computed: {
      showIcon () {
        return this.$store.getters.linkViewOnly.length > 0
      }
    },

    methods: {
      onClick () {
        this.$store.dispatch('shareNote')
      }
    }
  }
</script>

<style scoped>
</style>