<template>
  <view class="my-settle-container">
    <view class="radio" @click="toggleSelect">
      <radio color="#c00000" :checked="isAllCheck"/>
      全选
    </view>
    <view>
      合计:
      <text class="amount">￥{{ getSelectedAmount }}</text>
    </view>
    <view class="btn-settle" :style="{'background-color':getSelectedTotal > 0 ? '#c00000' : '#bdbdbd'}" @click="settle">
      结算({{ getSelectedTotal }})
    </view>
  </view>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  data() {
    return {
      time: 3, //3秒倒计时
      timer: null //定时器
    }
  },
  name: "my-settle",
  computed: {
    ...mapGetters('cart', ['getTotal', 'getSelectedTotal', 'getSelectedAmount']),
    ...mapGetters('user', ['getAddress', 'getToken']),
    isAllCheck() {
      return this.getTotal === this.getSelectedTotal
    }
  },
  methods: {
    ...mapMutations('cart', ['updateAllGoodsState']),
    ...mapMutations('user', ['setRedirectInfo']),
    //全选或者反选
    toggleSelect() {
      this.updateAllGoodsState(!this.isAllCheck)
    },
    // 结算
    settle() {
      //要选择商品
      if (this.getSelectedTotal === 0) {
        uni.showToast({
          title: '请选择商品进行结算',
          icon: 'error',
          duration: 800
        })
        return
      }
      // 要选择收获地址
      if (!this.getAddress) {
        uni.showToast({
          title: '请选择收获地址',
          icon: 'error',
          duration: 800
        })
        return
      }
      // 判断是否登录
      if (!this.getToken) {
        uni.showToast({
          title: '请登录后再结算!【' + this.time + '】秒之后跳转登录页',
          icon: 'none',//如果文字太长，必须把icon设置为none
          duration: 1000
        })
        // 定时器
        this.timer = setInterval(() => {
          if (this.time <= 1) {
            clearInterval(this.timer)
            this.time = 3

            //进行跳转到我的页面
            uni.switchTab({
              url: '/pages/my/index',
              success: () => {
                //记录跳转来源页面
                this.setRedirectInfo('/pages/cart/index')
              }
            })
            return
          }
          this.time--
          uni.showToast({
            title: '请登录后再结算!【' + this.time + '】秒之后跳转登录页',
            icon: 'none',//如果文字太长，必须把icon设置为none
            duration: 1000
          })
        }, 1000)
      }
      // 下单和结算
    }
  },
}
</script>

<style lang="scss" scoped>
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  // 将背景色从 cyan 改为 white
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    //background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>
