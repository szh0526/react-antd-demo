import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

const datas = [{
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
    'url': '/approvalRecordCredit-1-1',
    'code': null,
    'sort': 0,
    'type': 1,
    'createTime': 0,
    'menus': {
      'id': 'test-49b1-429c-ae85-e6682cb70571',
      'title': '测试-1-1-1',
      'url': '/approvalRecordCredit-1-1-1',
      'code': null,
      'sort': 0,
      'type': 1,
      'createTime': 0,
      'menus': null
    }
  },
    {
      'id': '91f4d54c-189b-4c18-8bca-7b8a0fd2481b',
      'title': '测试-1-2',
      'url': '/outCallAnalysis-1-2',
      'code': null,
      'sort': 2,
      'type': 1,
      'createTime': 0,
      'menus': null
    },
    {
      'id': '77f4d54c-189b-4c18-8bca-7b8a0fd2481b',
      'title': '404',
      'url': '/notmatch',
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
      'url': '/approvalRecordCreditSZ-2-1',
      'code': null,
      'sort': 9999,
      'type': 1,
      'createTime': 0,
      'menus': null
    },
      {
        'id': '821e83a5-7932-4db6-94bc-7560d69af1c5',
        'title': '测试-2-2',
        'url': '/outCallAnalysisSZ-2-2',
        'code': null,
        'sort': 9999,
        'type': 1,
        'createTime': 0,
        'menus': null
      }
    ]
  }]

const approvalRecordCredit1 = () => (
  <div>
    <h2>approvalRecordCredit-1-1</h2>
  </div>
)

const approvalRecordCredit11 = () => (
  <div>
    <h2>approvalRecordCredit-1-1-1</h2>
  </div>
)
const outCallAnalysis12 = () => (
  <div>
    <h2>outCallAnalysis-1-2</h2>
  </div>
)
const approvalRecordCreditSZ21 = () => (
  <div>
    <h2>approvalRecordCreditSZ-2-1</h2>
  </div>
)
const outCallAnalysisSZ22 = () => (
  <div>
    <h2>outCallAnalysisSZ-2-2</h2>
  </div>
)

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

const NoMatch = ({ location }) => (
  <div>
    <h3>404页面</h3>
  </div>
)

const routes = [
  { path: '/',
    exact: true,
    component: approvalRecordCredit1
  },
  { path: '/approvalRecordCredit-1-1',
    component: approvalRecordCredit1
  },
  { path: '/approvalRecordCredit-1-1-1',
    component: approvalRecordCredit11
  },
  { path: '/outCallAnalysis-1-2',
    component: outCallAnalysis12
  },
  { path: '/approvalRecordCreditSZ-2-1',
    component: approvalRecordCreditSZ21
  },
  { path: '/outCallAnalysisSZ-2-2',
    component: outCallAnalysisSZ22
  },
  { path: '/outCallAnalysisSZ-2-2',
    component: outCallAnalysisSZ22
  }
]

const DynamicSidebarRouter = () => (
  <Router>
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        <div style={{ padding: '10px', width: '200px', background: '#f0f0f0' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {datas.map(parent => (
               <React.Fragment key={parent.id}>
                 <p>
                   {parent.title}
                 </p>
                 <li>
                   <ul>
                     {parent.menus.map((child, index) => (
                        <li key={child.id}>
                          <Link to={`${child.url}`}>
                          {child.title}
                          </Link>
                        </li>
                      ))}
                   </ul>
                 </li>
               </React.Fragment>
             ))}
          </ul>
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
          <Switch>
            {routes.map((route, index) => (
               <Route
                 key={index}
                 exact={route.exact}
                 path={route.path}
                 component={route.component} />
             ))}
            <Route component={NoMatch} />
            {/*
                <Route exact path='/' component={approvalRecordCredit1} />
                <Route path='/approvalRecordCredit-1-1' component={approvalRecordCredit1} />
                <Route path='/approvalRecordCredit-1-1-1' component={approvalRecordCredit11} />
                <Route path='/outCallAnalysis-1-2' component={outCallAnalysis12} />
                <Route path='/approvalRecordCreditSZ-2-1' component={approvalRecordCreditSZ21} />
                <Route path='/outCallAnalysisSZ-2-2' component={outCallAnalysisSZ22} />
                <Route component={NoMatch} />
                                    */}
          </Switch>
        </div>
      </div>
    </React.Fragment>
  </Router>
)

export default DynamicSidebarRouter
