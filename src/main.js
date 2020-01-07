import Vue from 'vue'
import App from './App'
import store from './store'
import request from '@/utils/request'
import { asyncWrap } from '@/utils'

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
import '../mock' // simulation data

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$request = request
Vue.prototype.$asyncWrap = asyncWrap

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
