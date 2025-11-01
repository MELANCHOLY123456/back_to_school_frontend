import Vue from 'vue'
import Vuex from 'vuex'
import selfInf from './modules/selfInf'
import selectorItem from './modules/selectorItem'
import account from './modules/account'
import sysProps from './modules/sysProps'
import accInfo from './modules/accInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  // 提供数据
  state: {
  },
  // 计算属性
  getters: {
    token (state) {
      // 先确保 userInfo 存在，再访问 token
      return state.account.userInfo.token
    },
    user (state) {
      // 先确保 userInfo 存在，再访问 user
      return state.account.userInfo.user
    },
    form (state) {
      return state.selfInf.form
    },
    selectorItem (state) {
      return state.selectorItem.selectorItem
    }
  },
  // 方法
  mutations: {
    // reset (state) {
    //   // 调用每个模块的 reset mutation
    //   state.account.reset(state.account)
    //   state.selectorItem.reset(state.selectorItem)
    //   state.selfInf.reset(state.selfInf)
    //   state.accInfo.reset(state.accInfo)
    //   state.sysProps.reset(state.sysProps)
    // }
  },
  // 异步操作
  actions: {
  },
  // 分模块
  modules: {
    selfInf, selectorItem, account, sysProps, accInfo
  }
})
