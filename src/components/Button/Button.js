import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ children, className, disabled, loading, ...rest }) => (
  <button className={`button ${className}`} disabled={disabled || loading} {...rest}>
    {children}
    {loading && (
      <div className="button-loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    )}
  </button>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
