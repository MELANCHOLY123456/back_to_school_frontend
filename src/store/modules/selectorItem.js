import { getSelectorInfo, setSelectorInfo } from '@/utils/storage'

export default ({
  namespaced: true,
  // 提供数据
  state: {
    selectorItem: getSelectorInfo()
  },
  // 计算属性
  getters: {},
  // 方法
  mutations: {
    setSelectorItem (state, data) {
      state.selectorItem = data
      setSelectorInfo(data)
    }
    // reset (state) {
    //   state.selectorItem = null
    // }
  },
  // 异步操作
  actions: {},
  // 分模块
  modules: {}
})
