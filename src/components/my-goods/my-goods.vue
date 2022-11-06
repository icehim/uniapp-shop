<template>
  <view class="goods-item" @click="goToDetail(goods.goods_id)">
    <view class="goods-item-left">
      <image :src="goods.goods_small_logo || defaultImg" class="goods-pic"></image>
    </view>
    <view class="goods-item-right">
      <text class="goods-name">{{ goods.goods_name }}</text>
      <text class="goods-price">￥{{ goods.goods_price | toFixed }}</text>

    </view>
  </view>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      // 默认的空图片
      // defaultImg: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      defaultImg: require('../../static/logo.png')
    }
  },
  filters: {
    toFixed(val) {
      return val.toFixed(2)
    }
  },
  methods: {
    goToDetail(goods_id) {
      uni.navigateTo({
        url: '/subpkg/goods-detail/index?goods_id=' + goods_id
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
