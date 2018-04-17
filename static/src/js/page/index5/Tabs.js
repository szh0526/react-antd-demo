import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,Tabs,Icon } from 'antd';

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}
  

const mountNode = document.getElementById('root');

ReactDOM.render(
    <React.Fragment>
        <Row>
            <Col span={8}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab={<span><Icon type="apple" />Tab 1</span>} disabled key="1">
                        <div id="div1" style={{height:"500px",width:"100%",backgroundColor:"blue"}}>
                            111111111
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
                        <div id="div2" style={{height:"500px",width:"100%",backgroundColor:"red"}}>
                            222222222
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="user" />Tab 2</span>} key="3">
                        <div id="div3" style={{height:"500px",width:"100%",backgroundColor:"gray"}}>
                            33333333
                        </div>
                    </TabPane>
                </Tabs>
            </Col>
            <Col span={8}>
                <Tabs tabPosition="left" defaultActiveKey="1" onChange={callback}>
                    <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">
                        <div id="div1" style={{height:"500px",width:"100%",backgroundColor:"blue"}}>
                            111111111
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
                        <div id="div2" style={{height:"500px",width:"100%",backgroundColor:"red"}}>
                            222222222
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="user" />Tab 2</span>} key="3">
                        <div id="div3" style={{height:"500px",width:"100%",backgroundColor:"gray"}}>
                            33333333
                        </div>
                    </TabPane>
                </Tabs>
            </Col>
            <Col span={8}>
                <div className="card-container">
                    <Tabs type="card">
                    <TabPane tab="Tab Title 1" key="1">
                        <p>Content of Tab Pane 1</p>
                        <p>Content of Tab Pane 1</p>
                        <p>Content of Tab Pane 1</p>
                    </TabPane>
                    <TabPane tab="Tab Title 2" key="2">
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                    </TabPane>
                    <TabPane tab="Tab Title 3" key="3">
                        <p>Content of Tab Pane 3</p>
                        <p>Content of Tab Pane 3</p>
                        <p>Content of Tab Pane 3</p>
                    </TabPane>
                    </Tabs>
                </div>
            </Col>
        </Row>
    </React.Fragment>
, mountNode);