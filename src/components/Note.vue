<template>
  <div>
    Note
  </div>
</template>

<script>
  export default {
    name: 'note',

    props: {
      valid: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        show: true
      }
    },
    computed: {
      isVisible () {
        return this.show
      }
    },

    components: {
    },

    methods: {
      toggleVisibility () {
        this.show = !this.show
      }
    },

    mounted () {
      console.log('Other lifecycle hooks: beforeCreate, created, beforeMount, beforeUpdate, updated, beforeDestroy, destroyed')
    }
  }
</script>

<style scoped>
</style>