import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { useHomePage } from './useHomePage';
import { ConfigView, InventoryView, LoanView, ReturnView, UserView } from '../../views';
import { Loading } from '../../components';
import NavBar from './NavBar/NavBar';
import './HomePage.css';

const HomePage = () => {
  const { loading } = useHomePage();

  if (loading)
    return (
      <div className="app">
        <Loading />
      </div>
    ); // comentar para que funcione

  return (
    <div className="app">
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/">
            Home
          </Route>
          <Route path="/usuarios" component={UserView} />
          <Route path="/prestamo" component={LoanView} />
          <Route path="/devolucion" component={ReturnView} />
          <Route path="/inventario" component={InventoryView} />
          <Route path="/config/:panel" component={ConfigView} />
          <Route path="/tools">Herramientas</Route>
          <Route path="/help">Ayuda</Route>
          <Route path="/*">No match</Route>
        </Switch>
      </main>
    </div>
  );
};

export default HomePage;
