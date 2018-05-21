<template>
  <div>
    <section v-if="!showLoading" class="shop_container">
      <nav class="goback" @click="goback">
        <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none; stroke:rgb(255,255,255); stroke-width:3" />
        </svg>
      </nav>
      <header class="shop_detail_header" ref="shopheader" :style="{zIndex: showActivities? '14':'10'}">

      </header>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        showLoading: false, //显示加载动画
        showActivities: false, //是否显示活动详情页
      }
    },
    created() {

    },
    mounted() {

    },
    mixins: [],
    components: {

    },
    computed: {

    },
    methods: {

    },
    watch: {

    }
  }
</script>

<style lang="scss" scope>
  @import 'src/style/mixin';

  .shop_container{
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    left: 0;
    height: 100%;
  }
  .goback{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    z-index: 11;
    padding-top: 0.2rem;
    padding-left: 0.2rem;
  }
</style>