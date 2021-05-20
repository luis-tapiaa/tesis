import React from 'react';
import PropTypes from 'prop-types';

import './Key.css';

const Key = ({ label, value }) => (
  <div className="key">
    <div>{label}</div>
    <div className="value">{value || '-'}</div>
  </div>
);

Key.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any
}

export default Key;
