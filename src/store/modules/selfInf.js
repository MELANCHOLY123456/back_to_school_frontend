import { getSignupInfo, setSignupInfo } from '@/utils/storage'

export default ({
  namespaced: true,
  // 提供数据
  state: {
    form: getSignupInfo()
  },
  // 计算属性
  getters: {
  },
  // 方法
  mutations: {
    setForm (state, data) {
      state.form = data
      setSignupInfo(data)
    },
    setMembers (state, data) {
      state.form.teamMembers = data
      setSignupInfo(this.state.account.form)
    }
    // reset (state) {
    //   state.form = null
    // }
  },
  // 异步操作
  actions: {
  },
  // 分模块
  modules: {}
})
