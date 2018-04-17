import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,Collapse } from 'antd';
const Panel = Collapse.Panel;
const mountNode = document.getElementById('root');

const text = (
    <p style={{ paddingLeft: 24 }}>
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    </p>
);

function callback(key) {
    console.log(key);
}

ReactDOM.render(
    <React.Fragment>
        <Row>
            <Col span={8}>
                <Collapse accordion defaultActiveKey={['1']} onChange={callback}>
                    <Panel header="This is panel header 1" key="1">
                    <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                    <p>{text}</p>
                    </Panel>
                    <Panel showArrow={false} header="This is panel header 3" key="3" disabled>
                    <p>{text}</p>
                    </Panel>
                </Collapse>
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
        </Row>
    </React.Fragment>
, mountNode);