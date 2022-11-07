import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入模块
import cart from './modules/cart'
import user from "@/store/modules/user";

export default new Vuex.Store({
    modules: {
        cart,
        user
    }
})
