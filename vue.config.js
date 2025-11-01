const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const fs = require('fs')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      // 修改页面标题
      args[0].title = '湖南师范大学优秀学子回访母校报名系统'
      return args
    })
  },
  devServer: {
    // 启动时自动打开浏览器。
    open: false,
    client: {
      overlay: false
    },
    server: {
      type: 'https', // 新的配置方式
      options: {
        cert: fs.readFileSync(path.join(__dirname, 'src/ssl/112.74.38.245.crt')),
        key: fs.readFileSync(path.join(__dirname, 'src/ssl/112.74.38.245.key'))
      }
    }
  }
})
