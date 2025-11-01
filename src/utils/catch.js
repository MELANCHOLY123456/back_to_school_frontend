// import { Toast } from 'vant'
// import { removeInfo, removeSelectorInfo, removeSignupInfo } from '@/utils/storage'

export const myCatch = async (fn, ...args) => {
  console.log(...args)
  // try {
  const res = await fn(...args) // 调用传入的函数并传递参数
  if (res.status === 200) {
    return res
  } else {
    // if (res.status === 423) {
    //   Toast('退出登录')
    //   removeInfo()
    //   removeSelectorInfo()
    //   removeSignupInfo()
    //   this.$router.push('/mob/login') // 跳转到登录页
    // }
    // throw new Error(res.data.message || '请求失败')
  }
  // } catch (error) {
  // Toast.fail(error.response?.data?.message || error.message || '网络请求出错，请重试')
  // throw error // 继续抛出错误供调用方处理
}

// 用例

// function abc () {
//   console.log(111)
// }

// myCatch(abc, 1, 2)
