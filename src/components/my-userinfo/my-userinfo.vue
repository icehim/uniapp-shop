<template>
  <view class="my-userinfo-container">
    <view class="top-box">
      <image class="avatar" :src="getUserInfo.avatarUrl"></image>
      <text class="nickname">{{ getUserInfo.nickName }}</text>
    </view>
    <view class="panel-list">
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品店铺</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <view class="panel">
        <view class="panel-title">
          我的订单
        </view>
        <view class="panel-body">
          <view class="panel-item">
            <image class="icon" src="/static/my-icons/icon1.png" mode="scaleToFill"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image class="icon" src="/static/my-icons/icon2.png" mode="scaleToFill"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image class="icon" src="/static/my-icons/icon3.png" mode="scaleToFill"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image class="icon" src="/static/my-icons/icon4.png" mode="scaleToFill"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <view class="panel">
        <view class="panel-list-item">
          <text>收获地址</text>
          <uni-icons type="arrowright" size="17"/>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="17"/>
        </view>
        <view class="panel-list-item" @click="onLogout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="17"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from "vuex";

export default {
  components: {},

  computed: {
    ...mapGetters('user', ['getUserInfo'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    onLogout() {
      uni.showModal({
        title: '提示',
        content: '确定退出吗?',
        confirmColor: '#c00000',
        success: res => {
          if (res.confirm) {
            this.logout()
          } else if (res.cancel) {
            console.log('取消')
          }
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.my-userinfo-container {
  height: 100%;
  // 为整个组件的结构添加浅灰色的背景
  background-color: #f4f4f4;

  .top-box {
    height: 400rpx;
    background-color: #c00000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 45px;
      border: 2px solid white;
      box-shadow: 0 1px 5px black;
    }

    .nickname {
      color: white;
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
    }
  }

  .panel-list {
    padding: 0 10px;
    position: relative;
    top: -10px;

    .panel {
      background-color: white;
      border-radius: 3px;
      margin-bottom: 8px;

      .panel-title {
        line-height: 45px;
        padding-left: 10px;
        font-size: 15px;
        border-bottom: 1px solid #f4f4f4;
      }

      .panel-body {
        display: flex;
        justify-content: space-around;

        .panel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          font-size: 13px;
          padding: 10px 0;

          .icon {
            width: 35px;
            height: 35px;
          }
        }
      }

      .panel-list-item {
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        padding: 0 10px;
      }
    }
  }
}
</style>
