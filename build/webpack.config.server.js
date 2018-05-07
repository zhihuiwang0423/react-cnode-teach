const path = require('path')

module.exports = {
  target: 'node', // 执行环境，nodejs环境执行，web 浏览器执行
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public', // publicPath 如果不为空，则将输入文件路径定义成绝对路径，如果为空，则是相对路径
    libraryTarget: 'commonjs2' // 打包出来的js使用的模块方案，umd, cmd(seajs), amd(requirejs),commonjs
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}
