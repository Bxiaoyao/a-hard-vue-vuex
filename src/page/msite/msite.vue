<template>
  <div>
    <head-top signin-up='msite'>
      <router-link :to="'/search/geohash'" class="link_search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none" />
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255); stroke-width: 2" />
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import headTop from '../../components/header/head'
  import {cityGuess, msiteAddress} from '../../service/getData'

  export default {
    data() {
      return {
        geohash: '', //city页面传递过来的地址geohash
        msiteTitle: '请选择地址...', //msite页面头部标题
        hasGetData: false, //标识是否已经获取地理位置数据，成功后再获取商铺列表信息
      }
    },
    async beforeMount() {
      if (!this.$route.query.geohash) {
        const address = await cityGuess()
        this.geohash = address.latitude + ',' + address.longitude
      }else{
        this.geohash = this.$route.query.geohash
      }
      // 保存geohash到vuex
      this.SAVE_GEOHASH(this.geohash)
      // 获取位置信息
      let res = await msiteAddress(this.geohash)
      this.msiteTitle = res.name
      // 记录当前经度纬度
      this.RECORD_ADDRESS(res)

      this.hasGetData = true
    },
    mounted() {

    },
    components: {
      headTop,
    },
    computed: {

    },
    methods: {
      ...mapMutations([
        'RECORD_ADDRESS', 'SAVE_GEOHASH'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .link_search{
    left: .8rem;
    @include wh(.9rem, .9rem);
    @include ct;
  }
  .msite_title{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;
    .title_text{
      @include sc(0.8rem, #fff);
      text-align: center;
      display: block;
    }
  }
</style>