
const isDev = process.env.NODE_ENV === 'development'
const baseURL = isDev ? 'developmentURL' : 'productionURL'

const upload = (urlParam, name, filePath, formData={}, headersOption={}, showLoading=true) => {
    showLoading && uni.showLoading()
    const url = baseURL + urlParam

    return uni.uploadFile({
        url,
        name,
        filePath,
        formData,
        header: {
            token: uni.getStorageSync('TOKEN') || '',
            'Content-Type': 'multipart/form-data',
            ...headersOption
        }
    }).then(res => {
        showLoading && uni.hideLoading()
        if(res[0]) {
            uni.showToast({
                title: '上传失败',
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

export default upload