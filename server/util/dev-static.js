const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ansyc = require('react-async-bootstrapper')
// const ReactDomServer = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server')
const axios = require('axios')
const getTimeplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const Module = module.constructor
const mfs = new MemoryFs()
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle, createStoreMap
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
  createStoreMap = m.exports.createStoreMap
})
module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', (req, res, next) => {
    getTimeplate().then(template => {
      const routerContext = {}
      const app = serverBundle(createStoreMap, routerContext, req.url)
      // 异步
      ansyc(app).then(() => {
        if (routerContext.url) {
          res.status(302).setHeader('Loaction', routerContext.url)
          res.end()
          return
        }
        // const content = ReactDomServer.renderToString(serverBundle)
        // console.log(content)
        res.status(200).send(template)
        // res.status(200).send(content)
        // res.send(template.replace('<!-- app -->'), content)
      })
    }).catch((next) => {
      console.log(next)
    })
  })
}
