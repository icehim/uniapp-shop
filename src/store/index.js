import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入模块
import cart from './modules/cart'

export default new Vuex.Store({
    modules: {
        cart
    }
})
