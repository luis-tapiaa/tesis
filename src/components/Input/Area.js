import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Area = ({ className, ...props }) => (
  <textarea className={`input area ${className}`} {...props} />
);

Area.propTypes = {
  className: PropTypes.string
};

export default Area;
