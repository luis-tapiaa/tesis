import React from 'react';
import ReactDOM from 'react-dom';

import {
  AppContext,
  DataContext,
  DevolucionContext,
  InventarioContext,
  PrestamoContext,
  UsuariosContext
} from './context';
import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <AppContext>
    <DataContext>
      <DevolucionContext>
        <InventarioContext>
          <PrestamoContext>
            <UsuariosContext>
              <App />
            </UsuariosContext>
          </PrestamoContext>
        </InventarioContext>
      </DevolucionContext>
    </DataContext>
  </AppContext>,
  rootElement
);
