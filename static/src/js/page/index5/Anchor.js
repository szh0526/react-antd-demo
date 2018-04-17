import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,Anchor,BackTop,Divider } from 'antd';
import style from './App.css';

const mountNode = document.getElementById('root');

const { Link } = Anchor;

ReactDOM.render(
    <React.Fragment>
        <BackTop/>
        <Row style={{zIndex:10000}}>
            <Col span={8}>
                <Anchor>
                    <Link href="#components-anchor-demo-basic" title="Basic demo" />
                    <Link href="#components-anchor-demo-fixed" title="Fixed demo" />
                    <Link href="#API" title="API">
                        <Link href="#div1" title="div1" />
                        <Link href="#div2" title="div2" />
                        <Link href="#div3" title="div3" />
                        <Link href="#div4" title="div4" />
                    </Link>
                </Anchor>
            </Col>
        </Row>
        <Row>
            <Col span={8}>
                <div id="div1" style={{height:"500px",width:"100%",backgroundColor:"blue"}}>
                    111111111
                </div>
            </Col>
        </Row>
        <Divider />
        <Row>
            <Col span={8}>
                <div id="div2" style={{height:"500px",width:"100%",backgroundColor:"red"}}>
                    222222222
                </div>
            </Col>
        </Row>
        <Divider>分割线</Divider>
        <Row>
            <Col span={8}>
                <div id="div3" style={{height:"500px",width:"100%",backgroundColor:"gray"}}>
                    33333333
                </div>
            </Col>
        </Row>
        <Divider dashed>虚分割线</Divider>
        <Row>
            <Col span={8}>
                <div id="div4" style={{height:"500px",width:"100%",backgroundColor:"yellow"}}>
                    444444444
                </div>
            </Col>
        </Row>
    </React.Fragment>
, mountNode);