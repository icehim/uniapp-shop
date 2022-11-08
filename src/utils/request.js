import store from "@/store";

const BASE_URL = 'https://api-hmugo-web.itheima.net/api/public/v1/'

/*
* 接收对象作为参数，返回Promise对象
* */
const request = ({url, method = 'GET', header = {}, data = {}, tip = '拼命加载中...', isPullDown = false}) => {
    return new Promise((resolve, reject) => {
        if (!isPullDown) {
            uni.showLoading({
                title: tip,
                mask: true
            })
        }

        // 携带token
        const token = store.getters['user/getToken']
        // const token = 'Bearer eyJhbGciOiJIUzl1NilsInR5cCI6lkpXVCJ9.eyJ1aWQiOjUOLCJpYXQiOjE2NDI4MjAONjcslmV4cCI6MTAwMTYOMjgyMDQ2Nn0.euo_T0z46njSNZdEInVx-4IDPhl4oibXMR2gaxoHQwY'

        if (token) {
            header.Authorization = token
        }

        uni.request({
            url: `${BASE_URL}${url}`,
            method,
            data,
            header,
            success: res => {
                resolve(res.data)
            },
            fail: err => {
                reject(err)
            },
            complete: () => {
                uni.hideLoading()
            }
        })
    })
}

//挂载到全局的uni对象上去，这样每个页面都能直接通过uni对象访问
uni.$request = request
