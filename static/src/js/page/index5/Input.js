import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,Input,InputNumber,Select } from 'antd';
const { Search,TextArea } = Input;
const InputGroup = Input.Group;
const Option = Select.Option;
const mountNode = document.getElementById('root');

ReactDOM.render(
    <React.Fragment>
        <Row>
            <Col span={8}>
                <Input size="small" placeholder="Basic usage" />
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    enterButton
                />
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />
            </Col>
            <Col span={6}>
                <TextArea placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 8 }} />
            </Col>
            <Col span={10}>
                <InputGroup compact>
                    <Select defaultValue="1">
                        <Option value="1">Between</Option>
                        <Option value="2">Except</Option>
                    </Select>
                    <InputNumber style={{ width: 100, textAlign: 'center' }} placeholder="最小额度" />
                    <InputNumber style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
                    <InputNumber style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="最大额度" />
                </InputGroup>
                <InputGroup >
                    <Select defaultValue="1">
                        <Option value="1">一丁贷</Option>
                        <Option value="2">工薪贷</Option>
                    </Select>
                    <InputNumber style={{ width: 100, textAlign: 'center' }} placeholder="最小额度" />
                    <InputNumber style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
                    <InputNumber style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="最大额度" />
                </InputGroup>
            </Col>
        </Row>
    </React.Fragment>
, mountNode);