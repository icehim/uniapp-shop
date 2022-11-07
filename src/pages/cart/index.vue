<template>
  <view v-if="getGoodsList.length>0" class="cart-container">
    <my-address/>
    <view class="cart-title">
      <uni-icons type="shop" size="17">
      </uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <uni-swipe-action>
      <uni-swipe-action-item :right-options="options" v-for="goods in getGoodsList" :key="goods.goods_id"
                             @click="onDelete(goods.goods_id)">
        <my-goods :goods="goods">
          <template #radio>
            <radio @click.stop="radioChange(goods.goods_id,!goods.goods_state)" color="#c00000"
                   :checked="goods.goods_state"></radio>
          </template>
          <template #number>
            <!--【小技巧:如果触发时间的本身无法组织默认行为，加一个父节点去处理】-->
            <view @click.stop="">
              <!--$event代表change事件本身传递给我们的参数-->
              <uni-number-box @change="numberChange(goods.goods_id,$event)" v-model="goods.goods_number"
                              :min="1"/>
            </view>
          </template>
        </my-goods>
      </uni-swipe-action-item>
    </uni-swipe-action>
    <my-settle></my-settle>
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
  components: {},


  mixins: [tabBarBadge],
  data() {
    return {
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#c00000'
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters('cart', ['getGoodsList'])
  },
  methods: {
    ...mapMutations('cart', ['updateGoodsState', 'updateGoodsNumber', 'deleteGoodsById']),
    radioChange(goods_id, goods_state) {
      this.updateGoodsState({goods_id, goods_state})
    },
    numberChange(goods_id, goods_number) {
      this.updateGoodsNumber({goods_id, goods_number})

    },
    onDelete(goods_id) {
      this.deleteGoodsById(goods_id)
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
