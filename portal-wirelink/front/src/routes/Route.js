import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { store } from '../store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  isPrint,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate && !isPrint) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate && !isPrint) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
