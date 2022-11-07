<template>
  <view>
    <view class="address-choose-box" v-if="!getAddress">
      <button type="primary" size="mini" @click="chooseAddress">请选择收获地址 +</button>
    </view>
    <view class="address-info-box" v-else>
      <view class="row1">
        <text>收货人:{{ getAddress.userName }}</text>
        <view class="row1-right">
          <text class="phone">电话:{{ getAddress.telNumber }}</text>
        </view>
      </view>
      <view class="row2">
        <text class="row2-left">收货地址:{{ addressStr }}</text>
      </view>
    </view>
    <image class="address-border" src="/static/cart_border@2x.png"></image>
  </view>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  computed: {
    ...mapGetters('user', ['getAddress', 'addressStr'])
  },

  methods: {
    ...mapMutations('user', ['setAddress']),
    async chooseAddress() {
      const [err, res] = await uni.chooseAddress()
      if (err) return
      this.setAddress(res)
    }
  },
}
</script>

<style lang="scss" scoped>
// 底部边框线的样式
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}

// 选择收货地址的盒子
.address-choose-box {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 渲染收货信息的盒子
.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;

  // 第一行
  .row1 {
    display: flex;
    justify-content: space-between;

    .row1-right {
      display: flex;
      align-items: center;

      .phone {
        margin-right: 5px;
      }
    }
  }

  // 第二行
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>
