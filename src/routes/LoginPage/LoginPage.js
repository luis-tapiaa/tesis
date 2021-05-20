import React from 'react';

import { Button, Form, Input } from '../../components';
import { useLoginPage } from './useLoginPage';
import { get } from '../../util';
import './LoginPage.css';

const imgBase = 'https://luis-tapiaa.github.io/icons-host/icons/';

const LoginPage = () => {
  const { error, loading, onSubmit } = useLoginPage();

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-background">
          <img src={`${imgBase}/biblioteca.jpg`} alt="biblioteca" />
        </div>
        <div className="login-form">
          <img src={`${imgBase}/logo.png`} alt="logo" />
          <h1>Iniciar sesión</h1>
          <Form formName="login" onSubmit={onSubmit}>
            <Form.Field
              autoComplete="off"
              className="login-input"
              component={Input}
              name="usuario"
              placeholder="usuario"
            />
            <Form.Field
              className="login-input"
              component={Input}
              name="password"
              placeholder="contraseña"
              type="password"
            />
            <Button className="login-button" loading={loading} type="submit">
              Iniciar sesión
            </Button>
          </Form>
          <div className="login-error">{get(error, ['message'])}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
