<template>
  <!--uni app中不要写div、span 要写的话只能写uniapp提供的组件-->
  <!--指令要用vue的-->
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello'
    }
  },
  //生命周期需要使用uniapp提供的
  onLoad() {

  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;

}

.text-area {
  display: flex;
  justify-content: center;

}

.title {
  font-size: 36rpx;
  color: #8f8f94;

}
</style>
