import React from 'react'
import { ServerRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import App from './views/App'

import { createStoreMap } from './store/store'
// 让mobx在服务端渲染时不会重复的数据变换 provider接收store数据
useStaticRendering(true)
export default (stores, routerContext, url) => (
  <Provider {...stores} >
    <ServerRouter context={routerContext} location={url} >
      <App />
    </ServerRouter>
  </Provider>
)
export { createStoreMap }
