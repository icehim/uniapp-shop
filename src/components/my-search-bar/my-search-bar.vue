<template>
  <view class="my-search-container" @click="goToSearch">
    <view class="my-search-box">
      <uni-icons type="search" size="17"/>
      <text class="placeholder">{{ placeholder }}</text>
    </view>
  </view>
</template>

<script>
export default {
  components: {},

  props: {
    placeholder: {
      type: String,
      default: '搜索'
    },
  },
  methods: {
    goToSearch() {
      uni.navigateTo({
        url: '/subpkg/search/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-search-container {
  background-color: #c00000;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.my-search-box {
  height: 36px;
  background-color: #ffffff;
  border-radius: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .placeholder {
    font-size: 15px;
    margin-left: 5px;
  }
}
</style>
