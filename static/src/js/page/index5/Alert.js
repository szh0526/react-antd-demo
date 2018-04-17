import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col, Alert } from 'antd'

const mountNode = document.getElementById('root')
const onClose = function (e) {
  console.log(e, 'I was closed.')
}

ReactDOM.render(
  <React.Fragment>
    <Row>
      <Col span={8}>
      <Alert message='Warning text' banner />
      <Alert message='Success Text' type='success' />
      <Alert
        message='Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text'
        type='warning'
        closable
        onClose={onClose} />
      <Alert
        message='Error Text'
        description='Error Description Error Description Error Description Error Description Error Description Error Description'
        type='error'
        closable
        onClose={onClose} />
      <Alert message='Warning text' type='success' closable />
      <Alert message='Warning text' type='info' closable />
      <Alert message='Warning text' type='warning' closable />
      <Alert message='Warning text' type='error' closable />
      </Col>
      <Col span={8}>
      </Col>
      <Col span={8}>
      </Col>
    </Row>
  </React.Fragment>
  , mountNode)
