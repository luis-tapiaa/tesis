import React from 'react';
import PropTypes from 'prop-types';

import Area from './Area';

import './Input.css';

const Input = ({ className, setValue, ...props }) => (
  <input className={`input ${className}`} {...props} />
);

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text'
}

Input.Area = Area;
/*Input.Date = Date;
Input.File = File;
 */
export default Input;
