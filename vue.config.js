// const { defineConfig } = require('@vue/cli-service')
// const path = require('path')
// const fs = require('fs')

// module.exports = defineConfig({

//   transpileDependencies: true,

//   chainWebpack: config => {
//     config.plugin('html').tap(args => {
//       // 修改页面标题
//       args[0].title = '湖南师范大学优秀学子回访母校报名系统'
//       return args
//     })
//   },

//   devServer: {
//     // 启动时自动打开浏览器。
//     open: false,
//     client: {
//       overlay: false
//     },
//     server: {
//       type: 'https', // 新的配置方式
//       options: {
//         cert: fs.readFileSync(path.join(__dirname, 'src/ssl/112.74.38.245.crt')),
//         key: fs.readFileSync(path.join(__dirname, 'src/ssl/112.74.38.245.key'))
//       }
//     },
//     // 允许所有主机访问，解决 ngrok 访问时的 Invalid Host header 错误
//     allowedHosts: 'all'
//   }
// })

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '湖南师范大学优秀学子回访母校报名系统'
      return args
    })
  },

  devServer: {
    open: false,
    client: {
      overlay: false,
      // 关键配置：让 HMR 使用正确的 WebSocket 地址
      webSocketURL: {
        hostname: 'supercuriously-challengeable-teresia.ngrok-free.dev',
        pathname: '/ws',
        port: 0, // 使用当前访问端口
        protocol: 'wss' // 使用安全的 WebSocket
      }
    },
    // 移除 HTTPS 配置，使用 HTTP，让 ngrok 处理 HTTPS
    allowedHosts: 'all',
    port: 8081,
    host: '0.0.0.0',
    // 添加公共访问地址
    public: 'supercuriously-challengeable-teresia.ngrok-free.dev'
  }
})
