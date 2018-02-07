<template>
  <div>
    snackbar color: {{ color }}
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
        show: true,
        color: 'blue'
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
      // this.color = this.$snackbar.color
      console.log(this.$snackbar)
    }
  }
</script>

<style scoped>
</style>