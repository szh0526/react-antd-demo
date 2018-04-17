import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon, BackTop } from 'antd';
import style from './antdRouter.css';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu,ItemGroup } = Menu;

class AntdRouter extends React.Component {
  state = {
    openKeys: ['sub1'],
    collapsed: false
  };
  onToggle = () => {
    const collapsed = this.state.collapsed;
    this.setState({
      collapsed: !collapsed
    });
  }
  onCollapse = (collapsed) => {
    this.setState({
      collapsed: collapsed
    });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={style.logo} />
          <Menu 
            theme="dark" 
            mode="inline"
            defaultOpenKeys={['sub1']}
            defaultSelectedKeys={['1']}
          >
            <SubMenu
              key="sub1"
              title={<span><Icon type="team" /><span>Span</span></span>}
            >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={style.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.onToggle}
            />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item href=""><Icon type="home" />Home</Breadcrumb.Item>
              <Breadcrumb.Item href=""><Icon type="user" />Application</Breadcrumb.Item>
              <Breadcrumb.Item>An Application</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 0, minHeight: 380 }}>
              ...
              <br />
              Really
              <br />...<br />...<br />...<br />
              long
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default AntdRouter;