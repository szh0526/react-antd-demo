import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,Select } from 'antd';
const Option = Select.Option;
const mountNode = document.getElementById('root');


function handleChange(value) {
    console.log(`selected ${value}`);
  }
  
  function handleBlur() {
    console.log('blur');
  }
  
  function handleFocus() {
    console.log('focus');
  }

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }
  
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

ReactDOM.render(
    <React.Fragment>
        <Row>
            <Col span={8}>
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy1</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Select defaultValue="lucy" disabled style={{ width: 120 }} onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy1</Option>
                    <Option value="disabled" >Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Col>
            <Col span={8}>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择"
                    optionFilterProp="children"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
            </Col>
            <Col span={8}>
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Tags Mode"
                    onChange={handleChange}
                    tokenSeparators={[',']}
                >
                    {children}
                </Select>
            </Col>
        </Row>
    </React.Fragment>
, mountNode);