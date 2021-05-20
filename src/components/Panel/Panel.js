import React from 'react';
import PropTypes from 'prop-types';

import './Panel.css';

const Panel = ({ children, className, firstMenu, lastMenu, title }) => (
  <div className={`panel ${className}`}>
    <div className="panel-header">
      <div className="panel-item panel-first-menu">{firstMenu}</div>
      <div className="panel-item">{title}</div>
      <div className="panel-item panel-last-menu">{lastMenu}</div>
    </div>
    {children}
  </div>
);

Panel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
  firstMenu: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  lastMenu: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node])
};

export default Panel;
