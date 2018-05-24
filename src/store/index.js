import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 通过mutations修改state的时候，会在控制台打印出log日志
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// Vuex调试工具，在线下调试时候到严格模式，可以更直观
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})