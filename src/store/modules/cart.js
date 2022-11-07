export default {
    namespaced: true,
    state: {
        goodsList: uni.getStorageSync('cart') || [] //购物车中的商品列表
    },
    getters: {
        // 获取仓库中商品总数
        getTotal(state) {
            let total = 0
            state.goodsList.forEach(item => {
                total += item.goods_number
            })
            return total
        },
        //获取仓库中的商品列表
        getGoodsList(state) {
            return state.goodsList
        }
    },
    mutations: {
        // 加入购物车
        addToCart(state, goods) {
            //  todo add
            const findGoods = state.goodsList.find(item => item.goods_id === goods.goods_id)
            // 如果存在则商品数量累加
            if (findGoods) {
                findGoods.goods_number += 1
            } else {
                // 不存在则push
                state.goodsList.push(goods)
            }
            //最后保存到本地
            uni.setStorageSync('cart', state.goodsList)
        },
        //更改商品选中状态
        updateGoodsState(state, goods) {
            const findGoods = state.goodsList.find(item => item.goods_id === goods.goods_id)
            if (findGoods) {
                findGoods.goods_state = goods.goods_state
            }
            //最后保存到本地
            uni.setStorageSync('cart', state.goodsList)
        },
        //更改商品的数量
        updateGoodsNumber(state, goods) {
            const findGoods = state.goodsList.find(item => item.goods_id === goods.goods_id)
            if (findGoods) {
                findGoods.goods_number = goods.goods_number
            }
            //最后保存到本地
            uni.setStorageSync('cart', state.goodsList)
        },
        //根据id删除商品
        deleteGoodsById(state, goods_id) {
            state.goodsList = state.goodsList.filter(item => item.goods_id !== goods_id)
            //最后保存到本地
            uni.setStorageSync('cart', state.goodsList)
        }
    }
}
