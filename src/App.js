import React from 'react';

import { PrivateRoute, ProtectedRoute, Router, Switch } from './routes/Router';
import { useAppContext } from './context';
import { HomePage, LoginPage } from './routes';
import './styles.css';

export default function App() {
  const { token } = useAppContext();

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/login" token={token}>
          <LoginPage />
        </PrivateRoute>
        <ProtectedRoute path="/" token={token}>
          <HomePage />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}
