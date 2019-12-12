import Vue from 'vue'
import App from './App'
import {isJump} from '@/utils'


Vue.prototype.$isJump = isJump
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

