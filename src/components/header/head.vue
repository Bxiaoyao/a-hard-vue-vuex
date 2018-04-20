<template>
  <header id="head_top">
    <slot name='logo'></slot>
    <!-- <slot name='search'></slot> -->

    <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">
      <svg class="user_avatar" v-if="userInfo">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
      </svg>
      <span class="login_span" v-else>登录|注册</span>
    </router-link>

    <!-- <slot name="edit"></slot>
    <slot name="msite-title"></slot>
    <slot name="changecity"></slot>
    <slot name="changeLogin"></slot> -->
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
        //获取用户信息
        this.getUserInfo()
      },
      props: ['signinUp'],
      computed: {
        ...mapState([
            'userInfo'
          ]),
      },
      methods: {
        ...mapActions([
            'getUserInfo'
          ]),
      },
    }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  #head_top{
    background-color: $blue;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
  }
  .head_login{
    right: 0.55rem;
    @include sc(0.65rem, #fff);
    @include ct;
    .login_span{
      color: #fff;
    }
    .user_avatar{
      fill: #fff;
      @include wh(.8rem, .8rem);
    }
  }
</style>