import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col, Popconfirm, message } from 'antd'

const mountNode = document.getElementById('root')
function confirm (e) {
  console.log(e)
  message.success('Click on Yes')
}

function cancel (e) {
  console.log(e)
  message.error('Click on No')
}

ReactDOM.render(
  <React.Fragment>
    <Row>
      <Col span={8}>
      <Popconfirm
        title='Are you sure delete this task?'
        onConfirm={confirm}
        onCancel={cancel}
        placement="right"
        okText='是'
        cancelText='否'>
        <a href='#'>Delete</a>
      </Popconfirm>
      </Col>
      <Col span={8}>
      </Col>
      <Col span={8}>
      </Col>
    </Row>
  </React.Fragment>
  , mountNode)
