import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,Radio } from 'antd';
const RadioGroup = Radio.Group;

const mountNode = document.getElementById('root');

class App extends React.Component {
    state = {
      value: 2,
    }
    onChange = (e) => {
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    }
    render() {
      return (
        <RadioGroup name="radiogroup" onChange={this.onChange} value={this.state.value}>
          <Radio disabled={true} value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </RadioGroup>
      );
    }
  }
  
ReactDOM.render(<App />, mountNode);