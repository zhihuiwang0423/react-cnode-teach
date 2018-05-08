const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
  target: 'node', // 执行环境，nodejs环境执行，web 浏览器执行
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2' // 打包出来的js使用的模块方案，umd, cmd(seajs), amd(requirejs),commonjs
  }
})
