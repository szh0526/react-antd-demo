import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from 'antd/lib/grid'
import style from './App.css'
import { AutoComplete } from 'antd'

const rootNode = document.getElementById('root')

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street']
function Complete () {
  return (
    <AutoComplete
      style={{ width: 200 }}
      dataSource={dataSource}
      placeholder='请输入内容'
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1} />
  )
}
ReactDOM.render(<Complete />, rootNode)
