import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col ,Checkbox } from 'antd';

const mountNode = document.getElementById('root');

// function onChange(e) {
//   console.log(`checked = ${e.target.checked}`);
// }

// ReactDOM.render(
//   <Checkbox 
//     onChange={onChange}
//     defaultChecked
//     disabled
//   >是否开启</Checkbox>
// , mountNode);


const CheckboxGroup = Checkbox.Group;
const options = [
    { label: 'Apple', value: 'Apple'},
    { label: 'Pear', value: 'Pear'},
    { label: 'Orange', value: 'Orange'},
];
const defaultCheckedList = ['Apple'];

class App extends React.Component {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };
  render() {
    return (
      <React.Fragment>
        <Row>
            <Col span={2}>
                <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}
                >
                    全选
                </Checkbox>
            </Col>
            <Col span={22}>
                <CheckboxGroup style={{ width: '100%' }} value={this.state.checkedList} onChange={this.onChange}>
                    <Row>
                        {options.map(x => <Col key={x.value} span={2}><Checkbox value={x.value}>{x.label}</Checkbox></Col>)}
                    </Row>
                </CheckboxGroup>
            </Col>
        </Row>
      </React.Fragment>
    );
  }
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < options.length),
      checkAll: checkedList.length === options.length,
    });
  }
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? ['Apple','Pear','Orange'] : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
}

ReactDOM.render(<App />, mountNode);