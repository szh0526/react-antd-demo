import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,TimePicker } from 'antd';
import moment from 'moment';

const mountNode = document.getElementById('root');
const format = 'HH:mm';

function onChange(time, timeString) {
    console.log(time, timeString);
}

const UploadProps = {
    placeholder:"请选择时间",
    defaultValue:moment('12:08', format),
    format:format
}

ReactDOM.render(
    <React.Fragment>
        <Row>
            <Col span={8}>
                <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                <TimePicker onChange={onChange} disabled defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                <TimePicker minuteStep={15} secondStep={10} />
                <TimePicker {...UploadProps}/>
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
        </Row>
    </React.Fragment>
, mountNode);