/* 封装axios用于发送请求 */
import axios from 'axios'
import router from '@/router'
import { Toast } from 'vant'
import { removeInfo, removeSelectorInfo, removeSignupInfo } from './storage'

// // 创建一个新的axios实例
// const instance = axios.create({
//   // baseURL: 'https://112.74.38.245:8000',
//   // baseURL: 'http://127.0.0.1:8080',
//   baseURL: '/api',
//   timeout: 12500
//   // headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0' }
// })

const instance = axios.create({
  // 使用相对路径，让nginx处理代理
  baseURL: '/api',
  timeout: 30000, // 增加超时时间
  withCredentials: true // 如果需要跨域携带cookie
})

// // 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 请求到位之前显示加载中
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止点击下层的按钮
    loadingType: 'spinner', // 配置图标
    duration: 0 // 不自动关闭
  })

  // 调试信息
  console.log('Request URL:', config.baseURL + config.url)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(
  // 这个函数会在请求成功时被触发（即服务器返回了响应）。
  // 但是，它会检查 response.status 是否等于 200，
  // 意味着如果响应状态码不是 200（即不是正常的成功状态码），
  // 它会显示一个错误提示（通过 Toast），并且返回 Promise.reject()，
  // 使得后续的链式调用会跳转到失败的回调函数。
  // 否则，会清除任何之前显示的 Toast 消息，表明响应没有错误。
  function (response) {
    if (response.status !== 200) {
      Toast(response.data.message || '发生错误，请重试')
      return Promise.reject(response.data.message)
    } else {
      Toast.clear()
    }
    return response
  },

  function (error) {
    Toast.clear()
    if (error.code === 'ECONNABORTED') {
      // 超时错误
      Toast('请求超时，请检查网络或稍后重试')
    } else if (error.code === 'ERR_NETWORK') {
      // 网络错误
      Toast('网络错误，请检查网络连接')
      // router.push('/pc/login')
    } else if (error.response) {
      // 服务器返回了错误响应
      const response = error.response
      if (response.status === 423) {
        Toast(`登录过期:\n${response.data.message}`)
        removeSignupInfo()
        removeSelectorInfo()
        removeInfo()
        if (router.path !== '/mob/login') {
          router.push('/mob/login')
        }
      } else if (response.status >= 400 && response.status < 500) {
        Toast(`请求出错，请检查输入或稍后重试:\n${response.data.message}`)
      } else if (response.status >= 500) {
        Toast(`服务器出错，请稍后重试:\n${response.data.message}`)
      }
    } else {
      // 未知错误
      Toast('请求失败，请稍后重试')
    }
    return Promise.reject(error)
  }
)

// 导出配置好的实例
export default instance
