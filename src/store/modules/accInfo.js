export default ({
  namespaced: true,
  // 提供数据
  state () {
    return {
      isLeader: null,
      isSignuped: null,
      isBindEmail: null,
      isRealName: null,
      email: null
    }
  },
  // 计算属性
  getters: {
  },
  // methods
  mutations: {
    setIsLeader (state, val) {
      state.isLeader = val
    },
    setIsSignuped (state, val) {
      state.isSignuped = val
    },
    setIsBindEmail (state, val) {
      state.isBindEmail = val
    },
    setIsRealName (state, val) {
      state.isRealName = val
    },
    setEmail (state, val) {
      state.email = val
    }
    // reset (state) {
    //   state.isLeader = null
    //   state.isSignuped = null
    //   state.isBindEmail = null
    //   state.isRealName = null
    //   state.email = null
    // }
  },

  // 异步操作
  actions: {

  },
  // 分模块
  modules: {

  }
})
