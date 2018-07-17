import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login';
import MenuRoute from './components/MenuRoute';
import NotFund from './routes/Exception/404';
import AllRouters from './common/routers'
import AuthLogin from './utils/authority'

function RouterConfig({ history, app }) {
  let routers = AllRouters(app);
  
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" component={Login} />
        { routers.map(val=>
          <MenuRoute path={val.path} key={val.path} loginState={AuthLogin()} component={val.component} />
        ) }
        <Route component={ NotFund } />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
