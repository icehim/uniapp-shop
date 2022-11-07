export default {
    namespaced: true,
    state: {
        address: uni.getStorageSync('address')
    },
    getters: {
        getAddress(state) {
            return state.address
        },
        addressStr(state) {
            return state.address && `${state.address.provinceName}${state.address.cityName}${state.address.countyName}${state.address.detailInfo}`
        }
    },
    mutations: {
        setAddress(state, address) {
            state.address = address

            // 保存在本地
            uni.setStorageSync('address', address)
        }
    }
}
