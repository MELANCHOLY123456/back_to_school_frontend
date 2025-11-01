module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    '@babel/preset-env' // 使用 @babel/preset-env 代替 es2015
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    ['component', {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk'
    }]
  ]
}
