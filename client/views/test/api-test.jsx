import React from 'react'
import axios from 'axios'
/* eslint-disable */
export default class TestApi extends React.Component {
  // constructor() {
  //   super()
  //   this.getTopics = this.getTopics.bind(this)
  // }
  getTopics() {
    axios.get('/api/topics')
      .then((res) => {
        console.log(JSON.stringify(res))
      })
      .catch(err => {
        console.log(err)
      })
  }

  login() {
    axios.post('/api/user/login', {
      accessToken: 'cdfcb90f-dd5a-4be2-b47e-58e2b3442ba8'
    })
      .then((res) => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true')
    .then(resp => {
      console.log(resp)
    })
    .catch(err => {
      console.log(err)
    })

  }
  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
/* eslint-ensable */