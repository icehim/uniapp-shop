const BASE_URL = 'https://api-hmugo-web.itheima.net/api/public/v1/'

/*
* 接收对象作为参数，返回Promise对象
* */
const request = ({url, method = 'GET', header = {}, data = {}, tip = '拼命加载中...'}) => {
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: tip,
            mask: true
        })
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
