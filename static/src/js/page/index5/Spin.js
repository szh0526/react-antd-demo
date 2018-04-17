import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row,Col,Spin,Icon,Button } from 'antd';
import style from './App.css';

const mountNode = document.getElementById('root');

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Card extends React.Component {
    state = { loading: false }
    onClick = ()=>{
        this.setState({ loading: true });

        setTimeout(()=>{
            this.setState({ loading: false });
        },3000)
    }
    render() {
        const {loading} = this.state;
        return (
            <React.Fragment>
                <div className={style.example}>
                    <Spin indicator={antIcon} tip="Loading..." spinning={loading}>
                    </Spin>
                </div>
                <div style={{ marginTop: 16 }}>
                    <Button type="primary" size="small" onClick={ this.onClick }>查询</Button>
                </div>
            </React.Fragment>
        );
    }
}


ReactDOM.render(
    <React.Fragment>
        <Row>
            <Col span={6}>
                <Spin />
            </Col>
            <Col span={6}>
                <div className={style.example}>
                    <Spin indicator={antIcon} tip="Loading..." />
                </div>
            </Col>
            <Col span={6}>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Card/>
            </Col>
        </Row>
    </React.Fragment>
, mountNode);