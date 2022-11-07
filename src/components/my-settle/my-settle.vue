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
    <view class="btn-settle">
      结算({{ getSelectedTotal }})
    </view>
  </view>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "my-settle",
  computed: {
    ...mapGetters('cart', ['getTotal', 'getSelectedTotal', 'getSelectedAmount']),
    isAllCheck() {
      return this.getTotal === this.getSelectedTotal
    }
  },
  methods: {
    ...mapMutations('cart', ['updateAllGoodsState']),
    //全选或者反选
    toggleSelect() {
      this.updateAllGoodsState(!this.isAllCheck)
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
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>
