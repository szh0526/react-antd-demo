/*
 * @Description: 错误边界
 * 通过Error Boundary捕获到错误并对错误做优雅处理 包括上报错误日志、展示出错提示，而不是卸载整个组件树
 * 类似于try catch
 * @Author: zehao.sun 
 * @Date: 2018-01-16 19:20:24 
 * @Last Modified by: zehao.sun
 * @Last Modified time: 2018-04-13 10:11:20
 * @Email: 
 */
import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null
    }
  }

  // componentDidCatch生命周期函数 
  componentDidCatch (error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  // 异步请求接口记录错误日志消息 
  // sendErrorReport(err,info)
  }

  render () {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }
    return this.props.children
  }
}
