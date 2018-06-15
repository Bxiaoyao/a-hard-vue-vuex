<template>
  <div>
    <section v-if="!showLoading" class="shop_container">
      <nav class="goback" @click="goback">
        <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none; stroke:rgb(255,255,255); stroke-width:3" />
        </svg>
      </nav>
      <header class="shop_detail_header" ref="shopheader" :style="{zIndex: showActivities? '14':'10'}" v-if="shopDetailData != null">
        <img :src="imgBaseUrl + shopDetailData.image_path" class="header_cover_img">
        <section class="description_header">
          <router-link to="/shop/shopDetail" class="description_top">
            <section class="description_left">
              <img :src="imgBaseUrl + shopDetailData.image_path">
            </section>
            <section class="description_right">
              <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
              <p class="description_text">商家配送/{{shopDetailData.order_lead_time}}分钟送达/配送费￥{{shopDetailData.float_delivery_fee}}</p>
              <p class="description_promotion ellipsis">公告：{{promotionInfo}}</p>
            </section>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
              <path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none" />
            </svg>
          </router-link>
          <footer class="description_footer" v-if="shopDetailData.activities.length" @click="showActivitiesFun">
            <p class="ellipsis">
              <span class="tip_icon" :style="{backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color}">{{shopDetailData.activities[0].icon_name}}</span>
              <span>{{shopDetailData.activities[0].description}} (APP专享) </span>
            </p>
            <p>{{shopDetailData.activities.length}}个活动</p>
            <svg class="footer_arrow">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
            </svg>
          </footer>
        </section>
      </header>
      <transition name="fade">
        <section class="activities_details" v-if="showActivities">
          <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
          <h3 class="activities_ratingstar">
            <rating-star :rating='shopDetailData.rating'></rating-star>
          </h3>
          <section class="activities_list">
            <header class="activities_title_style"><span>优惠信息</span></header>
            <ul>
              <li v-for="item in shopDetailData.activities" :key="item.id">
                <span class="activities_icon" :style="{backgroundColor: '#' +item.icon_color, borderColor: '#' +item.icon_color}">{{item.icon_name}}</span>
                <span>{{item.description}} (APP专享) </span>
              </li>
            </ul>
          </section>
          <section class="activities_shopinfo">
            <header class="activities_title_style"><span>商家公告</span></header>
            <p>{{promotionInfo}}</p>
          </section>
          <svg width="60" height="60" class="close_activities" @click.stop="showActivitiesFun">
            <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none" />
            <line x1="22" y1="38" x2="38" y2="22" style="stroke: #999; stroke-width: 2" />
            <line x1="22" y1="22" x2="38" y2="38" style="stroke: #999; stroke-width: 2" />
          </svg>
        </section>
      </transition>
      <section class="change_show_type" ref="shooseType">
        <div>
          <span :class='{activity_show: changeShowType == "food"}' @click="changeShowType = 'food'">商品</span>
        </div>
        <div>
          <span :class='{activity_show: changeShowType == "rating"}' @click="changeShowType = 'rating'">评价</span>
        </div>
      </section>
      <transition name="fade-choose">
        <section v-show="changeShowType == 'food'" class="food_container">
          <section class="menu_container">
            <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
              <ul>
                <li v-for="(item, index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                  <img :src="getImgPath(item.icon_url)" v-if="item.icon_url">
                  <span>{{item.name}}</span>
                  <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
                </li>
              </ul>
            </section>
            <section class="menu_right" ref="menuFoodList">
              <ul>
                <li v-for="(item, index) in menuList" :key="index">
                  <header class="menu_detail_header">
                    <section class="menu_detail_header_left">
                      <strong class="menu_item_title">{{item.name}}</strong>
                      <span class="menu_item_description">{{item.description}}</span>
                    </section>
                    <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>
                    <p class="description_tip" v-if="index == TitleDetailIndex">
                      <span>{{item.name}}</span>
                      {{item.description}}
                    </p>
                  </header>
                  <section v-for="(foods, foodindex) in item.foods" :key="foodindex" class="menu_detail_list">
                    <router-link :to="{path: 'shop/foodDetail', query:{image_path: foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}" tag="div" class="menu_detail_link">
                      <section class="menu_food_img">
                        <img :src="imgBaseUrl + foods.image_path">
                      </section>
                      <section class="menu_food_description">
                        <h3 class="food_description_head">
                          <strong class="description_foodname">{{foods.name}}</strong>
                          <ul v-if="foods.attributes.length" class="attributes_ul">
                            <li v-for="(attribute, foodindex) in foods.attributes" :key="foodindex" :style="{color: '#' + attribute.icon_color, borderColor: '#' + attribute.icon_color}" :class="{attribute_new: attribute.icon_name == '新'}">
                              <p :style="{color: attribute.icon_name == '新'? '#fff' : '#' +attribute.icon_color}">{{attribute.icon_name == '新' ? '新品' : attribute.icon_name}}</p>
                            </li>
                          </ul>
                        </h3>
                        <p class="food_description_content">{{foods.description}}</p>
                        <p class="food_description_sale_rating">
                          <span>月售{{foods.month_sales}}份</span>
                          <span>好评率{{foods.satisfy_rate}}%</span>
                        </p>
                        <p v-if="foods.activity" class="food_activity">
                          <span :style="{color: '#' + foods.activity.image_text_color, borderColor: '#' + foods.activity.icon_color}">
                            {{foods.activity.image_text}}</span>
                          </span>
                        </p>
                      </section>
                    </router-link>
                    <footer class="menu_detail_footer">
                      <section class="food_price">
                        <span>￥</span>
                        <span>{{foods.specfoods[0].price}}</span>
                        <span v-if="foods.specifications.length">起</span>
                      </section>
                      <buy-cart :shopId='shopId' :foods='foods' @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun"></buy-cart>
                    </footer>
                  </section>
                </li>
              </ul>
            </section>
          </section>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType == 'rating'" class="rating_container" id="ratingContainer">
          
        </section>
      </transition>      
    </section>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {msiteAddress, shopDetails, foodMenu} from '../../service/getData'
  import buyCart from '../../components/common/buyCart'
  import ratingStar from '../../components/common/ratingStar'
  import {getImgPath} from '../../components/common/mixin'
  import {imgBaseUrl} from '../../config/env'
  export default {
    data() {
      return{
        geohash: '', //geohash位置信息
        shopId: null, //商店id值
        showLoading: false, //显示加载动画
        showActivities: false, //是否显示活动详情页
        shopDetailData: null, //商铺详情
        showActivities: false, //是否显示活动详情
        changeShowType: 'food', //切换显示商品或者评价
        menuList: [], //食品列表
        menuIndex: 0, //已选菜单索引值
        categoryNum: [], //商品类型右上角已加入购物车的数量
        TitleDetailIndex: null, //点击展示列表头部详情
        imgBaseUrl,
      }
    },
    created() {
      this.geohash = this.$route.query.geohash;
      this.shopId = this.$route.query.id;
    },
    mounted() {
      this.initData();
    },
    mixins: [getImgPath],
    components: {
      buyCart,
      ratingStar
    },
    computed: {
      ...mapState([
        'latitude', 'longitude'
      ]),
      promotionInfo: function (){
        return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_ADDRESS'
      ]),
      goback(){
        this.$router.go(-1);
      },
      async initData(){//初始化时获取基本数据
        if (!this.latitude) {
          //获取位置信息
          let res = await msiteAddress(this.geohash);
          //记录当前经纬度进入vuex
          this.RECORD_ADDRESS(res);
        }
        //获取商铺信息
        this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);
        //获取商铺食品列表
        this.menuList = await foodMenu(this.shopId);
      },
      showActivitiesFun(){//控制活动详情页的显示隐藏
        this.showActivities = !this.showActivities;
      },
      chooseMenu(index){//点击左侧食品列表标题，相应列表移动到最顶层

      },
      showTitleDetail(index){

      },
      listenInCart(){//监听圆点是否进入购物车

      },
      showChooseList(){//显示商品规格列表

      },
      showReduceTip(){//显示提示，无法减去商品

      },
      showMoveDotFun(){//显示夏洛圆球

      }

    },
    watch: {
      changeShowType: function (value){//商品、评论切换状态
        if (value === 'rating') {

        }
      }
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
  .shop_detail_header{
    overflow: hidden;
    position: relative;
    .header_cover_img{
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
      filter: blur(10px);
    }
    .description_header{
      position: relative;
      z-index: 10;
      background-color: rgba(119,103,137,.43);
      padding: 0.4rem 0 0.4rem 0.4rem;
      width: 100%;
      overflow: hidden;
      .description_top{
        display: flex;
        .description_left{
          margin-right: 0.3rem;
          img{
            @include wh(2.9rem, 2.9rem);
            display: block;
            border-radius: 0.15rem;
          }
        }
        .description_right{
          flex: 1;
          .description_title{
            @include sc(.8rem, #fff);
            font-weight: bold;
            width: 100%;
            margin-bottom: 0.3rem;
          }
          .description_text{
            @include sc(.5rem, #fff);
            margin-bottom: 0.3rem;
          }
          .description_promotion{
            @include sc(.5rem, #fff);
            width: 11.5rem;
          }          
        }
        .description_arrow{
          @include ct;
          right: 0.3rem;
          z-index: 11;
        }        
      }
      .description_footer{
        @include fj;
        margin-top: 0.5rem;
        padding-right: 1rem;
        p{
          @include sc(.5rem, #fff);
          span{
            color: #fff;
          }
          .tip_icon{
            padding: 0 .04rem;
            border: 0.025rem solid #fff;
            border-radius: 0.1rem;
            font-size: .4rem;
            display: inline-block;
          }
        }
        .ellipsis{
          width: 84%;
        }
        .footer_arrow{
          @include wh(.45rem, .45rem);
          position: absolute;
          right: .3rem;
        }
      }
    }
  }
  .activities_details{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #262626;
    z-index: 200;
    padding: 1.25rem;
    .activities_shoptitle{
      text-align: center;
      @include sc(.8rem, #fff);
    }
    .activities_ratingstar{
      display: flex;
      justify-content: center;
      transform: scale(2.2);
      margin-top: .7rem;
    }
    .activities_list{
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      @include sc(.5rem, #fff);
      li{
        margin-bottom: .2rem;
        .activities_icon{
          padding: 0 .02rem;
          display: inline-block;
          border: 0.025rem solid #fff;
          border-radius: 0.1rem;
        }
        span{
          color: #fff;
          line-height: .6rem;
        }
      }
    }
    .activities_shopinfo{
      p{
        line-height: .7rem;
        @include sc(.5rem, #fff);
      }
    }
    .activities_title_style{
      text-align: center;
      margin-bottom: 1rem;
      span{
        @include sc(.5rem, #fff);
        border: 0.025rem solid #555;
        padding: .2rem .4rem;
        border-radius: 0.5rem;
      }
    }
    .close_activities{
      position: absolute;
      bottom: 1rem;
      @include cl;
    }
  }
  .change_show_type{
    display: flex;
    background-color: #fff;
    padding: .3rem 0 .6rem;
    border-bottom: 1px solid #ebebeb;
    div{
      flex: 1;
      text-align: center;
      span{
        @include sc(.65rem, #666);
        padding: .2rem .1rem;
        border-bottom: 0.12rem solid #fff;
      }
      .activity_show{
        color: #3190e8;
        border-color: #3190e8;
      }
    }
  }
</style>