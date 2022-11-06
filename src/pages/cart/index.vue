<template>
  <view v-if="getGoodsList.length>0" class="cart-container">
    <view class="cart-title">
      <uni-icons type="shop" size="17">
      </uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <my-goods v-for="goods in getGoodsList" :key="goods.goods_id" :goods="goods"></my-goods>
  </view>
  <view v-else class="empty-cart">
    <image class="empty-img" src="/static/cart_empty@2x.png">
      <text class="tip-text">空空如也</text>
    </image>
  </view>
</template>

<script>
import tabBarBadge from "@/mixins/tabBar-badge";
// mapGetter是跟computed映射的，mapMutations、mapActions是跟methods映射的
import {mapGetters} from "vuex";

export default {
  components: {},

  mixins: [tabBarBadge],
  computed: {
    ...mapGetters('cart', ['getGoodsList'])
  }
}
</script>

<style lang="scss" scoped>
.cart-container {
  padding-bottom: 50px;

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
