<template>
  <view class="login-container">
    <uni-icons type="contact-filled" color="#AFAFAF" size="100"></uni-icons>
    <button class="btn-login" @click="wxLogin">一键登录</button>
    <text class="tip-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  // async onLoad() {
  //   await uni.login()
  // },
  computed: {
    ...mapGetters('user', ['getRedirectInfo'])
  },
  methods: {
    ...mapMutations('user', ['setUserInfo', 'setToken']),
    async wxLogin() {
      //获取后代所需的参数，需要调用uni的两个API，一个是获取用户信息，一个是wx.login
      const [err, res] = await uni.getUserProfile({
        desc: '为了更好的为您服务~'
      })
      if (err) return

      //  获取后台所需的参数
      const {encryptedData, iv, rawData, signature} = res

      // 保存用户信息
      this.setUserInfo(res.userInfo)

      //获取code值
      const [, {code}] = await uni.login()

      setTimeout(() => {
        this.setToken('aaabbbqwe')
      }, 1000)

      // 发请求，进行微信授权登录，一级登录之后的处理
      // const {meta: {status}, message} = await uni.$request({
      //   url: 'users/wxlogin',
      //   method: 'POST',
      //   data: {encryptedData, iv, rawData, signature, code}
      // })
      // if (status === 200) {
      //   //保存token
      //   this.setToken(message.token)
      //   // 如果有来源页面，跳转来源页面
      //   uni.showToast({
      //     title: '登录成功~',
      //     duration: 1000,
      //     success: () => {
      //       setTimeout(() => {
      //         if (this.getRedirectInfo) {
      //           uni.switchTab({
      //             url: this.getRedirectInfo
      //           })
      //         }
      //       }, 1000)
      //     }
      //   })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
    color: #ffffff;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
