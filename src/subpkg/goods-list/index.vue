<template>
  <view>
    <my-goods v-for="goods in goodsList" :key="goods.goods_id" :goods="goods"></my-goods>
  </view>
</template>

<script>
export default {
  data() {
    return {
      queryObj: {
        query: '',
        cid: '',
        pagenum: 1,//页码
        pagesize: 10//每页也容量
      },
      goodsList: [],// 商品列表
      total: 0  // 总条数
    }
  },
  onLoad(options) {
    this.queryObj.query = options.query || ''
    this.queryObj.cid = options.cid || ''
    this.getGoodListData()
  },
  methods: {
    async getGoodListData() {
      const {meta: {status}, message: {goods, total}} = await uni.$request({
        url: 'goods/search',
        data: this.queryObj
      })
      if (status === 200) {
        this.goodsList = goods
        this.total = total
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
