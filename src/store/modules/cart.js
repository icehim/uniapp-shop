export default {
    namespaced: true,
    state: {
        goodsList: uni.getStorageSync('cart') || [] //购物车中的商品列表
    },
    mutations: {
        // 加入购物车
        addToCart(state, goods) {
            //  todo add
            console.log('----cart----', goods)
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
        }
    }
}
