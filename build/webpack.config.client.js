const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const isDev = process.env.NODE_ENV === 'development'
const baseConfig = require('./webpack.base')
const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    // 自动创建一个Index.html文件并将entry里的文件按output路径输入到head中。
    new HtmlPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
    new HtmlPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
      filename: 'server.ejs'
    })
  ]
})

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html' // 所有404请求都到Index.html页面
    },
    proxy: {
      '/api/**': {target: 'http://localhost:3333', secure: false}
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config
