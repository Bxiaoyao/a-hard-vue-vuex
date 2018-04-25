<template>
  <div class="city_container">
    <head-top :head-title="cityname" go-back='true'>
      <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
    </head-top>
  </div>
</template>

<script>
  import headTop from '../../components/header/head'
  import {currentcity} from '../../service/getData'

  export default {
    data() {
      return {
        cityid: '', //当前城市id
        cityname: '', //当前城市名字
      }
    },
    mounted() {
        this.cityid = this.$route.params.cityid
        //获取当前城市名字
        currentcity(this.cityid).then(res => {
          this.cityname = res.name
        })
    },
    components: {
      headTop
    },
    computed: {

    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  @import '../..//style/mixin';
  .city_container{
    padding-top: 2.35rem;
  }
  .change_city{
    right: 0.4rem;
    @include sc(0.6rem, #fff);
    @include ct;
  }
</style>