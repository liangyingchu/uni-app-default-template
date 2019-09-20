import Vue from 'vue'
import App from './App'
import store from './store'
import request from '@/utils/request'
import { asyncWrap } from '@/utils'

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
