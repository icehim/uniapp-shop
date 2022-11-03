<template>
  <view>
    <!--轮播图-->
    <swiper indicator-dots autoplay circular :interval="3000">
      <swiper-item v-for="item in swipers" :key="item.good_id">
        <image :src="item.image_src"></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swipers: []//轮播图数据
    }
  },
  onLoad() {
    this.getSwipersData()
  },
  methods: {
    async getSwipersData() {
      const {message, meta: {status}} = await uni.$request({
        url: 'home/swiperdata',
      })
      if (status === 200) {
        this.swipers = message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  // 设置定位效果为“吸顶”
  position: sticky;
  // 吸顶的“位置”
  top: 0;
  // 提高层级，防止被轮播图覆盖
  z-index: 999;
}

swiper {
  height: 400rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}

.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
</style>
