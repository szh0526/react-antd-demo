import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col, message, Button } from 'antd'

const mountNode = document.getElementById('root')
const success = () => {
  message.success('This is a message of success')
}

const error = () => {
  message.error('This is a message of error')
}

const warning = () => {
  message.warning('This is message of warning')
}

const info = () => {
  message.info('This is a normal message')
}

ReactDOM.render(
  <div>
    <Button type='primary' onClick={info}>
      Display normal message
    </Button>
    <Button onClick={success}>
      Success
    </Button>
    <Button onClick={error}>
      Error
    </Button>
    <Button onClick={warning}>
      Warning
    </Button>
  </div>
  , mountNode)
