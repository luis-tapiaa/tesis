import React from 'react';

const Field = ({ component, error, formName, label, name, validate = '', ...rest }) => {
  const id = `${formName}-${name}`;

  const renderLabel = label && (
    <label htmlFor={id} className="label">
      {label || name}
      {validate.includes('req') && <span className="field-required"> *</span>}
    </label>
  );

  const renderError = error && <div className="error">{error}</div>;

  return (
    <div className="field">
      {renderLabel}
      {React.createElement(component, {
        ...rest,
        name,
        id,
        validate,
        className: error && 'field-error'
      })}
      {renderError}
    </div>
  );
};

export default Field;
