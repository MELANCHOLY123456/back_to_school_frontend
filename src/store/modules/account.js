import { getInfo, setInfo } from '@/utils/storage'

export default ({
  namespaced: true,
  // 提供数据
  state () {
    return {
      userInfo: getInfo()
    }
  },
  // 计算属性
  getters: {
  },
  // methods
  mutations: {
    // 设置用户信息
    setUserInfo (state, res) {
      if (!res || !res.data) {
        console.error('传入数据无效:', res)
        return
      }
      state.userInfo = res.data
      setInfo(state.userInfo) // 保存到本地存储
      console.log('Vuex 更新 userInfo:', state.userInfo)
    }

    // reset (state) {
    //   state.userInfo = {}
    // }
  },

  // 异步操作
  actions: {

  },
  // 分模块
  modules: {

  }
})
