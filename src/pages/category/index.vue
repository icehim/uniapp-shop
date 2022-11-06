<template>
  <view>
    <!--使用子组件-->
    <my-search-bar/>
    <view class="scroll-view-container">
      <!--  左边的可以滚动的scroll-view 它里面显示一级分类-->
      <scroll-view scroll-y class="left-scroll-view" :style="{height:h+'px'}">
        <view @click="currentIndex = index" v-for="(item,index) in categories" :key="item.cat_id"
              :class="['left-scroll-view-item',currentIndex === index ?'active':'']">
          {{ item.cat_name }}
        </view>
      </scroll-view>
      <!--  右边的二级，三级分类  -->
      <scroll-view scroll-y class="right-scroll-view" :style="{height:h+'px'}">
        <!--二级标题-->
        <view v-for="item in level2List" class="cate-lv2-title" :key="item.cat_id">/{{ item.cat_name }}/
          <!--三级列表-->
          <view class="cate-lv3-list">
            <!--三级的每一项-->
            <view class="cate-lv3-item" v-for="subitem in item.children" :key="subitem.cat_id"
                  @click="goToList(subitem.cat_id)">
              <image :src="subitem.cat_icon"></image>
              <text>{{ subitem.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import tabBarBadge from "@/mixins/tabBar-badge";

export default {
  mixins: [tabBarBadge],
  data() {
    return {
      categories: [],// 一级、二级、三级分类数组
      currentIndex: 0,  //选中的索引
      h: 0  //scroll-view 的高度
    }
  },
  onLoad() {
    this.getCategoriesData()

    // 获取可以使用的高度
    const {windowHeight} = uni.getSystemInfoSync()
    this.h = windowHeight - 50
  },
  computed: {
    level2List() {
      return this.categories[this.currentIndex] && this.categories[this.currentIndex].children
    }
  },
  methods: {
    async getCategoriesData() {
      const {meta: {status}, message} = await uni.$request({
        url: 'categories'
      })
      if (status === 200) {
        this.categories = message
      }
    },
    //跳转到商品列表中去
    goToList(cid) {
      uni.navigateTo({
        url: '/subpkg/goods-list/index?cid=' + cid
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 240rpx;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }

  .right-scroll-view {
    .cate-lv2-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }

    .cate-lv3-list {
      display: flex;
      flex-wrap: wrap;

      .cate-lv3-item {
        width: 33.33%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        image {
          width: 60px;
          height: 60px;
        }

        text {
          font-size: 12px;
        }
      }
    }
  }
}

</style>
