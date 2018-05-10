import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom'
import Routes from '../config/router'

export default class App extends React.Component {
  componentDidMount() {
    // do something here
  }
  render() {
    return [
      <Router>
        <div key="banner">
          <Link to="/" >首页</Link>
          <br />
          <Link to="/detail" >详情页</Link>
          <br />
          <Link to="/testapi" >测试页</Link>
          <Routes />
        </div>
      </Router>,
    ]
  }
}
