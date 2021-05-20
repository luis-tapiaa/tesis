import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import './IconButton.css';

const IconButton = ({ className, onClick, ...rest }) => (
  <button onClick={onClick} type="button" className={`icon-button ${className}`}>
    <Icon {...rest} />
  </button>
);

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string
};

IconButton.defaultProps = {
  size: '20px'
};

export default IconButton;
