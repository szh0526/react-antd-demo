import React, {Component,Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import {Layout, Breadcrumb, Icon, BackTop} from 'antd';
import style from './layout.css';

//静态引入 头,底,侧边栏,路由
import LayoutHeader from './header.js';
import LayoutFooter from './footer.js';
import LayoutSideMenu from './sideMenu.js';
import RouterConfig from './route.js';

const {Content} = Layout;

class PageLayout extends Component {
    state = {
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
        const {collapsed} = this.state;
        return (
            <Fragment>
            <BackTop/>
            <Router>
                <Route render={({ location }) => (
                    <Layout className={style.layoutWrap}>
                        <LayoutSideMenu
                            collapsed={collapsed}
                            onCollapse={this.onCollapse}
                            onOpenChange={this.onOpenChange}/>
                        <Layout>
                            <LayoutHeader onToggle={this.onToggle}/>
                            <Content className={style.contentWrap}>
                                <RouterConfig location={location}/>
                            </Content>
                            <LayoutFooter/>
                        </Layout>
                    </Layout>
                )} />
            </Router>
            </Fragment>
        );
    }
}

export default PageLayout;
