import React from 'react';
import PropTypes from 'prop-types';

import './Icon.css';

const baseUrl = 'https://luis-tapiaa.github.io/icons-host/icons';

const Icon = ({ className, icon, size, ...rest }) => {
  const style = {
    backgroundImage: `url(${baseUrl}/${icon}.png)`,
    backgroundSize: size,
    width: size,
    height: size
  };
  return <i className={`icon ${className}`} {...rest} style={style} />;
};

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string
};

Icon.defaultProps = {
  icon: 'add',
  size: '36px'
};

export default Icon;
