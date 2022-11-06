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
      total: 0,  // 总条数
      isLoadingMore: false//是否正在进行上拉加载
    }
  },
  onLoad(options) {
    this.queryObj.query = options.query || ''
    this.queryObj.cid = options.cid || ''
    this.getGoodListData()
  },
  onReachBottom() {
    // 如果正在执行上拉加载更多，则return
    if (this.isLoadingMore) return;
    //判断是否还有下一页数据，如果有则继续执行下面的代码，如果没有则提示并且return
    if (this.goodsList.length >= this.total) {
      uni.showToast({
        title: '没有更多数据啦~',
        duration: 800
      })
      return
    }
    //发请求
    this.queryObj.pagenum++
    this.getGoodListData()
  },
  onPullDownRefresh() {
    //把页码设置为1，并且把数据清空
    this.queryObj.pagenum = 1
    this.goodsList = []
    //重新发请求
    this.getGoodListData(true)
  },
  
  methods: {
    async getGoodListData(isPullDown = false) {
      this.isLoadingMore = true
      const {meta: {status}, message: {goods, total}} = await uni.$request({
        url: 'goods/search',
        data: this.queryObj,
        isPullDown
      })
      if (status === 200) {
        this.goodsList = [...this.goodsList, ...goods]
        this.total = total
        this.isLoadingMore = false

        //如果是下拉刷新，数据回来，则停止默认的下拉刷新行为
        if (isPullDown) {
          uni.stopPullDownRefresh()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
