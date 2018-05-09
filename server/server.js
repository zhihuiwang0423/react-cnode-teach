const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const session = require('express-session') // 获取session
const bodyParser = require('body-parser') // 把application数据转化成req.body上数据
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false, // 每次请求是否重新生成id
  saveUninitialized: false,
  secret: 'react node class'
}))

app.use('/api/user', require('./util/handle-login'))
app.use('./api', require('./util/proxy'))

const isDev = process.env.NODE_ENV === 'development'
if (!isDev) {
  // 为什么加.default 因为页面中Js模块引入形式是commonjs2,即采用import export引入形式，require的形式取的是整个对象，要单独引用default对象
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  const devStatic = require('./util/dev-static')
  devStatic(app)
}
app.listen(3333, () => {
  console.log('server is listening on 3333')
})
