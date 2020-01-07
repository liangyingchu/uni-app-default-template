
const isDev = process.env.NODE_ENV === 'development'
const baseURL = isDev ?
    'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin' :
    'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin'

const request = (urlParam, data, method='get', headersOption={}, showLoading=true) => {
    showLoading && uni.showLoading()
    const url = baseURL + urlParam

    return uni.request({
        url,
        method,
        data,
        dataType: 'json',
        header: {
            token: uni.getStorageSync('TOKEN') || '',
            'content-type': 'application/json',
            ...headersOption
        }
    }).then(res => {
        showLoading && uni.hideLoading()
        if(res[0]) {
            uni.showToast({
                title: '网络请求失败',
                icon: 'none'
            })
        } else {
            // 网络请求成功
            if(res[1].data && res[1].data.code === 200) {
                return res[1].data.body
            } else {
                uni.showToast({
                    title: res[1].data.message,
                    icon: 'none'
                })
            }
        }
    }).catch(err => {
        isDev && uni.showToast({
            title: `${url}接口${err}`,
            icon: 'none'
        })
        throw new Error(err)
    })
}

export default request