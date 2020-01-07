import Mock from 'mockjs'
import demoAPI from './demo'

// Fix an issue with setting withCredentials = true, cross-domain request lost cookies
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
        this.custom.xhr.withCredentials = this.withCredentials || false
    }
    this.proxy_send(...arguments)
}
// 配置拦截 Ajax 请求时的行为
Mock.setup({
    timeout: '350-600' // 指定被拦截的 Ajax 请求的响应时间，单位是毫秒。
})

// Demo
Mock.mock(/\/demo\/getList/, 'get', demoAPI.getList)