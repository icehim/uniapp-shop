<template>
  <view class="goods-detail-container" v-if="goods_info">
    <!--  轮播图 -->
    <swiper indicator-dots autoplay circular interval="3000">
      <swiper-item v-for="item in goods_info.pics" :key="item.pics_id">
        <image @click="preview(item.pics_big)" :src="item.pics_big"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{ goods_info.goods_price }}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{ goods_info.goods_name }}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    <!--  图文详情  -->
    <!--vue中的写法-->
    <!--<view v-html="goods_info.goods_introduce"></view>-->
    <!-- rich-text 小程序写法 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!--  商品导航  -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
                     @buttonClick="buttonClick"></uni-goods-nav>
    </view>
  </view>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'

export default {
  components: {},

  computed: {
    ...mapGetters('cart', ['getTotal'])
  },
  data() {
    return {
      goods_info: null, //商品详情数据
      options: [
        {
          icon: 'shop',
          text: '店铺'
        },
        {
          icon: 'cart',
          text: '购物车',
          info: 0
        }
      ],
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }
      ]
    }
  },
  onLoad(options) {
    this.getGoodsDetailData(options.goods_id)
    //给购物车徽标设置总数
    this.options[1].info = this.getTotal
  },
  watch: {
    getTotal() {
      //监听到仓库中的值改变之后，重新给徽标赋值
      this.options[1].info = this.getTotal
    }
  },
  methods: {
    //  方式2
    //  参数1:模块名,参数2:方法的数组
    ...mapMutations('cart', ['addToCart']),

    async getGoodsDetailData(goods_id) {
      const {meta: {status}, message} = await uni.$request({
        url: 'goods/detail',
        data: {
          goods_id
        }
      })
      if (status === 200) {
        message.goods_introduce = message.goods_introduce.replace(/<img/g, '<img style="display:block;"').replace(/webp/g, 'jpg')
        this.goods_info = message
      }
    },
    //预览图片
    preview(current) {
      uni.previewImage({
        current,//当前要预览的图片地址
        urls: this.goods_info.pics.map(item => item.pics_big) //需要与懒得图片http链接列表
      })
    },

    onClick(e) {
      if (e.content.text === '购物车') {
        uni.switchTab({url: '/pages/cart/index'})
      }
    },
    buttonClick(e) {
      if (e.content.text === '加入购物车') {

        //  思路
        // 准备好商品对象
        const goods = {
          goods_id: this.goods_info.goods_id,
          goods_name: this.goods_info.goods_name,
          goods_price: this.goods_info.goods_price,
          goods_small_logo: this.goods_info.goods_small_logo,
          goods_number: this.goods_info.goods_number,
          goods_state: true  //状态，默认选中
        }
        // 把商品对象存入到vuex
        //  方式1：直接调用
        // this.$store.commit('cart/addToCart', goods)

        // 方法2：辅助函数 mapMutations
        this.addToCart(goods)
        // 加完之后再调用一次
        // this.options[1].info = this.getTotal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-detail-container {
  // 给页面外层的容器，添加 50px 的内padding，
  // 防止页面内容被底部的商品导航组件遮盖
  padding-bottom: 50px;

  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  // 商品信息区域的样式
  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        padding-right: 10px;
      }

      // 收藏区域
      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    // 运费
    .yf {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }

  .goods_nav {
    // 为商品导航组件添加固定定位
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
