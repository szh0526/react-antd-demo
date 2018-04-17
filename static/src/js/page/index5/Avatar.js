import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col, Avatar, Badge } from 'antd'

const mountNode = document.getElementById('root')

ReactDOM.render(
  <React.Fragment>
    <Row>
      <Col span={8}>
      <Avatar size='small' icon='user' />
      <Avatar shape='square' size='large' icon='user' />
      </Col>
      <Col span={8} style={{marginTop:"15px"}}>
      <span style={{ marginRight: 24 }}><Badge count={2222}> <Avatar shape='square' icon='user' /> </Badge></span>
      <span><Badge dot> <Avatar shape='square' icon='user' /> </Badge></span>
      <span><Badge dot> <Avatar shape='square' icon='user' /> </Badge></span>
      </Col>
      <Col span={8} style={{marginTop:"15px"}}>
      <span><Badge count={1000} overflowCount={999}> <Avatar shape='square' icon='user' /> </Badge></span>
      </Col>
    </Row>
  </React.Fragment>
  , mountNode)
