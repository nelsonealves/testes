import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ResetPassword from '../pages/ResetPassword';
import Home from '../pages/Home';
import Imprimir from '../pages/Imprimir';

import Dashboard from '../pages/Dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={SignIn} />
      <Route path="/cadastro" component={SignUp} />
      <Route path="/forgetPass" component={ResetPassword} />
      <Route path="/imprimir/:ticket" component={Imprimir} isPrint />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
