export default {
    namespaced: true,
    state: {
        address: uni.getStorageSync('address'),//收货地址
        token: uni.getStorageSync('token'),//token
        redirectInfo: null//记录登陆成功之后，跳转到哪里去
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
        getRedirectInfo(stete) {
            return stete.redirectInfo
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
            uni.setStorageSync('redirectInfo', redirectInfo)
        }
    }
}
