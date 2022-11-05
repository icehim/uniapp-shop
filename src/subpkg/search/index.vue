<template>
  <view class="search-container">
    <!--  头部部分  -->
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" placeholder="请输入搜索内容" cancelButton="none"
                      @clear="searchGoodsList=[]"></uni-search-bar>
    </view>
    <!--  身体部分 条件渲染，有内容渲染列表没有内容渲染搜索历史 -->

    <view v-if="searchGoodsList.length > 0" class="sugg-list">
      <view class="sugg-item" v-for="item in searchGoodsList" :key="item.goods_id" @click="goToDetail(item.goods_id)">
        <text class="goods-name">{{ item.goods_name }}</text>
      </view>
    </view>
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clear"/>
      </view>
      <view class="history-list">
        <uni-tag @click="goToList(item)" v-for="item in searchHistoryList" :key="item" :text="item"/>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      timer: null,
      searchGoodsList: [],//搜索到的商品列表
      searchHistoryList: []//搜索历史列表
    }
  },
  onLoad() {
    this.searchHistoryList = uni.getStorageSync('history') || []
  },
  methods: {
    input(e) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getSearchResult(e)
      }, 500)
    },
    //获取搜索结果
    async getSearchResult(e) {
      if (e.trim().length === 0) return
      // 保存搜索历史
      this.saveHistory(e)
      const {meta: {status}, message} = await uni.$request({
        url: 'goods/qsearch',
        data: {
          query: e
        }
      })
      if (status === 200) {
        this.searchGoodsList = message
      }
    },
    //跳转到详情页面
    goToDetail(goods_id) {
      uni.navigateTo({
        url: '/subpkg/goods-detail/index?goods_id=' + goods_id
      })
    },
    saveHistory(keyword) {
      //  去重，就是把数组中之前存在的删掉，下面通过unshift加进去
      const findIndex = this.searchHistoryList.findIndex(item => item === keyword)
      if (findIndex > -1) {
        this.searchHistoryList.splice(findIndex, 1)
      }
      //  倒序
      this.searchHistoryList.unshift(keyword)
      //  保存到本地
      uni.setStorageSync('history', this.searchHistoryList)
    },
    //  清除搜索历史
    clear() {
      this.searchHistoryList = []
      uni.setStorageSync('history', [])
    },
    //跳转到商品列表
    goToList(query) {
      uni.navigateTo({
        url: '/subpkg/goods-list/index?query=' + query
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.search-container {
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;

    ::v-deep .uni-searchbar {
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      flex-direction: row;
      position: relative;
      padding: 16rpx;
      /* 将默认的 #FFFFFF 改为 #C00000 */
      background-color: #c00000;
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      ::v-deep .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
}
</style>
