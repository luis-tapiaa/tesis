import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import useSelect from './useSelect';
import './Select.css';

const Select = ({ className, name, onBlur, onChange, options, placeholder, value }) => {
  const { active, toggleActive, ref, onClick } = useSelect(name, onChange, onBlur);

  const menu = options.map(option => (
    <div className="select-option" key={option.id} onClick={onClick} value={option.id}>
      <span value={option.id}>{option.nombre}</span>
    </div>
  ));

  const selected = options.find(o => o.id?.toString() === value?.toString())?.nombre;

  return (
    <div className="select-root" ref={ref} >
      <div
        className={`selected-value ${className} ${active && 'select-active'}`}
        onClick={toggleActive}
      >
        <div>{selected || placeholder}</div>
        <Icon icon="caret-down" className="select-icon" />
      </div>
      <div className={`select-menu ${active && 'select-menu-active'}`}>{menu}</div>
    </div>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  value: PropTypes.any
};

Select.defaultProps = {
  options: []
};

export default Select;
