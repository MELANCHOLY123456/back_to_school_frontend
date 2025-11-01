
export default ({
  namespaced: true,
  // 提供数据
  state () {
    return {
      props: null
    }
  },
  // 计算属性
  getters: {
  },
  // methods
  mutations: {
    // 设置用户信息
    setProps (state, props) {
      state.props = props
    }
    // reset (state) {
    //   state.props = null
    // }
  },

  // 异步操作
  actions: {

  },
  // 分模块
  modules: {

  }
})
