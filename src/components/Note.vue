<template>
  <div>
    <p>snackbar color: {{ color }}</p>
    <p>snackbar new color: {{ color2 }}</p>
    <p>snackbar default color: {{ color3 }}</p>
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
        color: 'blue',
        color2: 'green',
        color3: 'black'
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
      this.color = this.$snackbar.get('color')
      this.$snackbar.set('color', 'pink')
      this.color2 = this.$snackbar.get('color')
      this.$snackbar.reset()
      this.color3 = this.$snackbar.get('color')
      // console.log('ttt', this.$snackbar.get('ttt'))
    }
  }
</script>

<style scoped>
</style>