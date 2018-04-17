import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,InputNumber } from 'antd';

const mountNode = document.getElementById('root');

function onChange(value) {
    console.log('changed', value);
}

ReactDOM.render(
    <React.Fragment>
        <Row>
            <Col span={8}>
                <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                <InputNumber disabled={true} min={1} max={10} defaultValue={3} onChange={onChange} />
                <InputNumber
                    defaultValue={1000}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={onChange}
                />
                <InputNumber
                    size="large"
                    defaultValue={100}
                    min={0}
                    max={100}
                    step={0.1}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    onChange={onChange}
                />
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
        </Row>
    </React.Fragment>
, mountNode);