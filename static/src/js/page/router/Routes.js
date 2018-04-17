import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import style from './router.css';

import asyncComponent from 'asyncComponent.js';
import NotFound from './containers/notFound.js';

const routes = [
  {
      path: '/approvalRecordCredit/1-1',
      component: asyncComponent(() => {
          return import (/* webpackChunkName: "/js/page/router/approvalRecordCredit11"*/
          "./containers/approvalRecordCredit11.js")
      })
  }, {
      path: '/outCallAnalysis/1-2',
      component: asyncComponent(() => {
          return import (/* webpackChunkName: "/js/page/router/outCallAnalysis12"*/
          "./containers/outCallAnalysis12.js")
      })
  }, {
      path: '/approvalRecordCreditSZ/2-1',
      component: asyncComponent(() => {
          return import (/* webpackChunkName: "/js/page/router/approvalRecordCreditSZ21"*/
          "./containers/approvalRecordCreditSZ21.js")
      })
  }
];

const matchRoute = ({ match:{params} }) => {
    console.log(`root ${params.root}`);
    console.log(`path ${params.path}`);
    const route = routes.find(x => x.path == `/${params.root}/${params.path}`);
    return (
        <route.component/>
    )
}

const renderLinks = (data) =>{
  return (
    <ul>
      {data.map((child, index) => (
        <li key={child.id}>
            <Link to={`${child.url}`}>
            {child.title}
            </Link>
        </li>
      ))}
    </ul>
  );
}

const SiderRouter = () => (
  <Router>
    <Route render={({ location }) => (
        <div className={style.routerWrap}>
        <div className={style.routerTitle}>
            <ul className={style.routerRootUl}>
              {datas.map(parent => (
                <React.Fragment key={parent.id}>
                  <p>{parent.title}</p>
                  <li>{renderLinks(parent.menus)}</li>
                </React.Fragment>
              ))}
            </ul>
        </div>
        <div className={style.routerContent}>
            {/*注意: webpack css-loader后会变成css module，css 是.example {}，
              是局部作用域 需要className={style['example']}来调用，
              是全局:global(.example) {}就可以className="example"调用。
              由于 transitionName 是调用的全局样式 所以需要:global(.example)
            */}
            <ReactCSSTransitionGroup 
                transitionName="transitionWrap"
                transitionAppear={true}
                transitionAppearTimeout={300}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
            <Route exact path="/" component={routes[0].component}/>
            <Route
                location={location}
                key={location.key}
                path='/:root/:path'
                component={matchRoute} />

            <Route path='/404' component={NotFound} />
            </ReactCSSTransitionGroup>
        </div>
        </div>
    )} />
  </Router>
)

export default SiderRouter;


var datas = [{
  'id': 'd5c230bf-cc2c-485c-956e-db004cac9194',
  'title': '测试-1',
  'url': '',
  'code': null,
  'sort': 4,
  'type': 1,
  'createTime': 0,
  'menus': [{
    'id': '083e0681-49b1-429c-ae85-e6682cb70571',
    'title': '测试-1-1',
    'url': '/approvalRecordCredit/1-1',
    'code': null,
    'sort': 0,
    'type': 1,
    'createTime': 0,
    'menus': null
  },
    {
      'id': '91f4d54c-189b-4c18-8bca-7b8a0fd2481b',
      'title': '测试-1-2',
      'url': '/outCallAnalysis/1-2',
      'code': null,
      'sort': 2,
      'type': 1,
      'createTime': 0,
      'menus': null
    }
  ]
},
  {
    'id': '643d88dd-199d-4c32-a50c-492a8998d061',
    'title': '测试-2',
    'url': '',
    'code': null,
    'sort': 5,
    'type': 1,
    'createTime': 0,
    'menus': [{
      'id': '244d66de-8482-4598-b87a-61f5792d6091',
      'title': '测试-2-1',
      'url': '/approvalRecordCreditSZ/2-1',
      'code': null,
      'sort': 9999,
      'type': 1,
      'createTime': 0,
      'menus': null
    },{
      'id': 'ttttt-8482-4598-b87a-61f5792d6091',
      'title': '404',
      'url': '/404',
      'code': null,
      'sort': 9999,
      'type': 1,
      'createTime': 0,
      'menus': null
    }]
  }]