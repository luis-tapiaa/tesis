import React from 'react';
import { Link, Route } from 'react-router-dom';

import ConfigPane from './ConfigPanel/ConfigPanel';
import { panels } from './config';
import './ConfigView.css';

const ConfigView = ({ match }) => {
  const renderMenu = panels.map(p => (
    <Link
      className={`${match.params.panel === p.link && 'option-active'}`}
      key={p.link}
      to={`/config/${p.link}`}
    >
      {p.title}
    </Link>
  ));

  const renderPanels = panels.map(({ component, ...rest }) => (
    <Route key={rest.link} path={`/config/${rest.link}`}>
      {React.createElement(component || ConfigPane, rest)}
    </Route>
  ));
  return (
    <React.Fragment>
      <div className="config-menu">{renderMenu}</div>
      <div className="config-panels">{renderPanels}</div>
    </React.Fragment>
  );
};

export default ConfigView;
