import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export { BrowserRouter as Router, Switch } from 'react-router-dom';

export const PrivateRoute = ({ children, token, ...rest }) => (
  <Route {...rest}>{!token ? children : <Redirect to="/" from="/login" />}</Route>
);

export const ProtectedRoute = ({ children, token, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      token ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
    }
  />
);
