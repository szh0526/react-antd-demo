import React, { PureComponent,Fragment } from 'react';
import ReactDOM from 'react-dom';
import SidebarRouter from 'router.js';
import DynamicSidebarRouter from 'dynamicRouter.js';
import AnimateRouter from 'animateRouter.js';
import SiderRouter from 'Routes.js';
import PageLayout from 'layout.js';
import AntdRouter from 'antdRouter.js';

const mountNode = document.getElementById('root');

ReactDOM.render(<Fragment>
    <PageLayout/>
    {/*
    <PageLayout/>
    <SiderRouter/>
    <AnimateRouter/>
    <hr/>
    <p>动态路由</p>
    <DynamicSidebarRouter/>
    <hr/>
    <p>侧边栏路由</p>
    <Sidebar/>
    <hr/>
    <p>普通路由</p>
    <SidebarRouter/>*/}
</Fragment>, mountNode);
