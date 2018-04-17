import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

const SidebarRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/about">关于</Link></li>
        <li><Link to="/one">one</Link></li>
        <li><Link to="/one1">one-history</Link></li>
        <li><Link to="/one2">NoMatch</Link></li>
      </ul>

      <hr/>

      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/one" render={() => <h3>One</h3>}/>
        <Redirect from="/one1" to="/one"/>
        {/*<Route path="/:id" component={Child}/>*/}
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>首页</h2>
  </div>
)

const About = () => (
  <div>
    <h2>关于</h2>
  </div>
)

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

const NoMatch = ({ location }) => (
  <div>
    <h3>跳转至404页面</h3>
  </div>
)

export default SidebarRouter;

