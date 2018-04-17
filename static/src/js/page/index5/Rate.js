import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,Rate,Icon } from 'antd';

const mountNode = document.getElementById('root');

ReactDOM.render(
    <React.Fragment>
        <Row>
            <Col span={8}>
                <Rate defaultValue={3} disabled allowClear={false} />
                <Rate character={<Icon type="heart" />} allowHalf defaultValue={3.5} allowClear={false} />
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
        </Row>
    </React.Fragment>
, mountNode);