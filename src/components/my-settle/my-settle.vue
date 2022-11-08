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
    ...mapGetters('cart', ['getTotal', 'getSelectedTotal', 'getSelectedAmount', 'getGoodsList']),
    ...mapGetters('user', ['getAddress', 'getToken', 'addressStr']),
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
        return;
      }
      //下单和支付
      this.orderAndPay()
    },
    //下单和支付
    async orderAndPay() {
      /*
      * 1.下单
      *   1.1准备好下单所需要的参数
      * */
      const params = {
        order_price: this.getSelectedAmount,
        consignee_addr: `${this.addressStr} ${this.getAddress.userName} ${this.getAddress.telNumber}`,
        goods: this.getGoodsList.filter(item => item.goods_state).map(item => {
          return {
            goods_id: item.goods_id,
            goods_number: item.goods_number,
            goods_price: item.goods_price
          }
        })
      }

      //1.2发请求创建订单
      const {meta: {status}, message} = await uni.$request({
        url: 'my/order/create',
        method: 'POST',
        data: params
      })
      if (status !== 200) return
      // 取出order_number
      const {order_number} = message
      // 2.支付
      // 2.1获取uni.requestPayment所需的五个参数
      const {meta: {status: status2}, message: message2} = await uni.request({
        url: 'my/order/req_unifiedorder',
        method: 'POST',
        data: {
          order_number
        }
      })
      if (status2 !== 200) return

      //2.2调用uni.requestPayment弹出支付框
      uni.requestPayment({
        ...message2.pay,
        success: async res => {
          //告诉后台，小程序端已经支付成功，把后后台订单状态改为已支付
          const {meta: {status: status3}, message: message3} = await uni.$request({
            url: 'my/orders/chkOrder',
            method: 'POST',
            data: {
              order_number
            }
          })
          if (status3 !== 200) return
          uni.showToast({
            title: message3,
            duration: 800
          })
        },
        fail: ({errMsg}) => {
          // 取消
          let message = ''
          if (errMsg === 'requestPayment:fail cancel') {
            message = '您取消了支付'
          } else {//其他错误
            message = '支付失败请重试'
          }
          uni.showToast({
            title: message,
            icon: 'error',
            duration: 800
          })
        }
      })
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
