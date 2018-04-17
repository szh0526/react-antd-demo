import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col,Button, Radio, Menu, Dropdown,Icon } from 'antd';
import style from './App.css';

const rootNode = document.getElementById('root');

class App extends Component {
  state = {
    size: 'large',
    iconLoading: false
  };

  handleSizeChange = (e) => {
    this.setState({
      size: e.target.value
    });
  }

  enterIconLoading = () => {
    this.setState({
      iconLoading: true
    });

    setTimeout(()=>{
      this.setState({
        iconLoading: false
      });
    },2000)
  }

  handleMenuClick = (e) => {
    console.log('click', e);
  }

  render() {

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );
    const DemoBox = props => <p className={style[`height-${props.value}`]}>{props.children}</p>;

    return (
      <div className={ style.App }>
        <Row type="flex" justify="start">
          <Col span={4} lg={2}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>
        <Row type="flex" justify="end" align="bottom">
          <Col span={4}><DemoBox value={100}>col-4</DemoBox></Col>
          <Col span={4}><DemoBox value={50}>col-4</DemoBox></Col>
          <Col span={4}><DemoBox value={120}>col-4</DemoBox></Col>
          <Col span={4}><DemoBox value={80}>col-4</DemoBox></Col>
        </Row>
        <Row>
          <Col span={18}>
            <Radio.Group value={ this.state.size } onChange={ this.handleSizeChange }>
              <Radio.Button value="large">Large</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="small" disabled>Small</Radio.Button>
            </Radio.Group>
          </Col>
          <Col span={6}>
            <Button type="primary" shape="circle" icon="download" size={ this.state.size } />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Button type="primary" size="small" >
              <Icon type="check-circle" />确认</Button>
            <Button size="small">
              <Icon type="close-circle" />关闭</Button>
            <Button type="primary" size="small" icon="search">查询</Button>
            <Button type="primary" size="small" href="https://www.baidu.com/" target="_blank" >跳转</Button>
          </Col>
          <Col span={12}>
            <Button type="primary" size="small" loading={ this.state.iconLoading } onClick={ this.enterIconLoading }>查询</Button>
            <Button size="small">
            <Icon spin={true} type="sync" />关闭</Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {/* 下拉按钮组 */}
            <Dropdown overlay={menu}>
              <Button>
                下拉 <Icon type="down" style={{ fontSize: 16, color: 'rgb(250, 140, 22)' }} />
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <div className="gutter-example">
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box"><Button type="primary" size="small" icon="search">查询</Button></div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box"><Button type="primary" size="small" icon="search">查询</Button></div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box"><Button type="primary" size="small" icon="search">查询</Button></div>
            </Col>
            <Col className="gutter-row" span={6} offset={24}>
              <div className="gutter-box"><Button type="primary" size="small" icon="search">查询</Button></div>
            </Col>
          </Row>
        </div>
      </div>
      );
  }
}

ReactDOM.render(<App/>, rootNode);