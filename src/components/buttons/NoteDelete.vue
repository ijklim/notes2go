<template>
  <v-tooltip bottom>
    <v-btn icon slot="activator" @click="onClick" v-if="showIcon">
      <v-icon :color="color">delete</v-icon>
    </v-btn>
    <span>Delete</span>
  </v-tooltip>
</template>

<script>
  export default {
    name: 'NoteDelete',

    props: {
      color: {
        type: String,
        default: 'white'
      }
    },
    computed: {
      showIcon () {
        return (this.$store.getters.isDataEditable && this.$store.getters.linkViewOnly.length > 0)
      }
    },

    methods: {
      onClick () {
        this.$store.dispatch('deleteNote')
      }
    }
  }
</script>

<style scoped>
</style>