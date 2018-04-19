<template>
  <header id="head_top">
    <slot name='logo'></slot>
    <slot name=search></slot>
  </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
      data(){
        return{

        }
      },
      mounted(){

      },
      props: [],
      computed: {
        ...mapState([

          ]),
      },
      methods: {
        ...mapActions([

          ]),
      },
    }

</script>

<style lang="scss" scoped>
  
</style>