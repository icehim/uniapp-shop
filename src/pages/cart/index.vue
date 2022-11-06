<template>
  <view v-if="getGoodsList.length>0" class="cart-container">
    <view class="cart-title">
      <uni-icons type="shop" size="17">
      </uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <my-goods v-for="goods in getGoodsList" :key="goods.goods_id" :goods="goods">
      <template #radio>
        <radio @click.stop="radioChange(goods.goods_id,!goods.goods_state)" color="#c00000"
               :checked="goods.goods_state"></radio>
      </template>
    </my-goods>
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
import {mapGetters, mapMutations} from "vuex";

export default {

  mixins: [tabBarBadge],
  computed: {
    ...mapGetters('cart', ['getGoodsList'])
  },
  methods: {
    ...mapMutations('cart', ['updateGoodsState']),
    radioChange(goods_id, goods_state) {
      this.updateGoodsState({goods_id, goods_state})
    }
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
