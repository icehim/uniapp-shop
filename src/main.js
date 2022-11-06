import Vue from 'vue'
import App from './App'
//导入请求封装文件，能够使用uni.$request
import '@/utils/request'
import store from "@/store";

Vue.config.productionTip = false

App.mpType = 'app'

// 把store对象提供给“store"选项， 这可以把store的实力注入所有的子组件
const app = new Vue({
    store,
    ...App
})
app.$mount()
