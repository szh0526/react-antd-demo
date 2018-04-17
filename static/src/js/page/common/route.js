/*
 * @Description: 路由配置
 * 问题1.直接访问路径页面空白
 * 知识点：BrowserRouter: 浏览器自带的API，restful风格（需要后台做相应的调整);HashRouter: 使用hash方式进行路由;
 * 解决方案：做服务端渲染ssr或node输出时,采用BrowserRouter 前端通过浏览器先访问node层或ssr静态路由,返回前端
 * @Author: zehao.sun 
 * @Date: 2018-02-13 13:38:59 
 * @Last Modified by: zehao.sun
 * @Last Modified time: 2018-04-13 10:11:23
 * @Email: 
 */
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import asyncComponent from 'asyncComponent.js';
import NotFound from 'notFound.js';

const routes = [
    {
        path: '/approvalRecordCredit/1-1',
        component: asyncComponent(() => {
            return import (/* webpackChunkName: "/js/page/router/approvalRecordCredit11"*/
            "../router/containers/approvalRecordCredit11.js")
        })
    }, {
        path: '/outCallAnalysis/1-2',
        component: asyncComponent(() => {
            return import (/* webpackChunkName: "/js/page/router/outCallAnalysis12"*/
            "../router/containers/outCallAnalysis12.js")
        })
    }, {
        path: '/approvalRecordCreditSZ/2-1',
        component: asyncComponent(() => {
            return import (/* webpackChunkName: "/js/page/router/approvalRecordCreditSZ21"*/
            "../router/containers/approvalRecordCreditSZ21.js")
        })
    }
];

const matchRoute = ({match: {params}}) => {
    // console.log(`root ${params.root}`);
    // console.log(`path ${params.path}`);
    const route = routes.find(x => x.path == `/${params.root}/${params.path}`);
    return (<route.component/>)
}

class RouteConfig extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {location} = this.props;
        return (
            <ReactCSSTransitionGroup
                transitionName="transitionWrap"
                transitionAppear={true}
                transitionAppearTimeout={300}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <Route exact path="/" component={routes[0].component}/>
                <Route
                    location={location}
                    key={location.key}
                    path='/:root/:path'
                    component={matchRoute}/>

                <Route path='/404' component={NotFound}/>
            </ReactCSSTransitionGroup>
        )
    }
}

RouteConfig.propTypes = {
    location: PropTypes.object.isRequired
}

export default RouteConfig;