import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,Switch } from 'antd';

const mountNode = document.getElementById('root');

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

ReactDOM.render(
    <React.Fragment>
        <Row>
            <Col span={8}>
                <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={false} onChange={onChange} />
            </Col>
            <Col span={8}>
                <Switch size='large' disabled={true} onChange={onChange} />
            </Col>
            <Col span={8}>
            </Col>
        </Row>
    </React.Fragment>
, mountNode);