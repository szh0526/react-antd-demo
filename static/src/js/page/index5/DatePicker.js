import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const nextMonth = () =>{
    const data = new Date();
    data.setMonth(data.getMonth()+1);
    return data;
}

const mountNode = document.getElementById('root');

function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}
  
function onOk(value) {
    console.log('onOk: ', value);
}
  
function onOpenChange(status) {
    console.log('是否打开: ', status);
}

ReactDOM.render(
    <React.Fragment>
        <Row>
            <Col span={24}>
                <DatePicker size="small" defaultValue={moment(new Date(), dateFormat)} format={dateFormat} onChange={onChange} placeholder="请选择日期"/>
                <br />
                <RangePicker size="small" showTime defaultValue={[moment(new Date(), dateFormat), moment(nextMonth(), dateFormat)]} format="YYYY-MM-DD HH:mm:ss" onChange={onChange} />
                <br />
                <RangePicker size="small" showTime placeholder={['开启日期', '结束日期']} format="YYYY-MM-DD HH:mm:ss" onOk={onOk} onChange={onChange} onOpenChange={onOpenChange} />
                <br />
                <WeekPicker size="small" disabled onChange={onChange} placeholder="Select week" />
                <br />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <DatePicker size="small" format="HH:mm:ss"  showTime mode="time" />
                <br />
            </Col>
        </Row>
    </React.Fragment>
, mountNode);