export default {
    namespaced: true,
    state: {
        address: uni.getStorageSync('address'),//收货地址
        token: uni.getStorageSync('token'),//token
        userInfo: uni.getStorageSync('userInfo'),//用户信息
        redirectInfo: null,//记录登陆成功之后，跳转到哪里去
    },
    getters: {
        getAddress(state) {
            return state.address
        },
        addressStr(state) {
            return state.address && `${state.address.provinceName}${state.address.cityName}${state.address.countyName}${state.address.detailInfo}`
        },
        getToken(state) {
            return state.token
        },
        getRedirectInfo(state) {
            return state.redirectInfo
        },
        getUserInfo(state) {
            return state.userInfo
        }
    },
    mutations: {
        setAddress(state, address) {
            state.address = address
            // 保存在本地
            uni.setStorageSync('address', address)
        },
        setToken(state, token) {
            state.token = token
            // 保存在本地
            uni.setStorageSync('token', token)
        },
        setRedirectInfo(state, redirectInfo) {
            state.redirectInfo = redirectInfo
            // 保存在本地
            // uni.setStorageSync('redirectInfo', redirectInfo)
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
            // 保存在本地
            uni.setStorageSync('userInfo', userInfo)
        }
    },
    actions: {
        logout({commit}) {
            //模拟发送请求给后台，告知后台前端要退出，
            setTimeout(() => {
                //清除token
                //同一个模块下不需要写模块名
                commit('setToken', null)
                //清除vuex中的用户信息
                commit('setUserInfo', null)
                // 跳转到登录页面
            }, 500)
        }
    }
}
