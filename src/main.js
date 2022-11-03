import Vue from 'vue'
import App from './App'
//导入请求封装文件，能够使用uni.$request
import '@/utils/request'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
