import React, { Children } from 'react';

import Field from './Field';
import { useForm } from './useForm';
import { Button } from '../';
import { isEmpty, isEqual } from '../../util';
import './Form.css';

const Form = ({
  children,
  formName,
  onSubmit: handleSubmit,
  onChangeForm,
  initialValues,
  validate = {},
  path,
  ...props
}) => {
  const { errors, touched, values, ...rest } = useForm(initialValues, validate, onChangeForm);

  const hasErrors = () => {
    if (isEmpty(errors)) return false;
    const keys = Object.keys(errors);
    for (let err of keys) {
      if (errors[err]) return true;
    }
    return false;
  };

  const hasValues = () => {
    if (isEmpty(values)) return true;
    const keys = Object.keys(values);
    let pristine = 0;
    for (let val of keys) {
      if (values[val]) {
        pristine += 1;
      }
    }
    return !pristine;
  };

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(values);
  };

  const renderChildren = Children.map(children, child => {
    const {
      props: { name },
      type
    } = child || { props: {} };
    switch (type) {
      case Field:
        return React.cloneElement(child, {
          error: touched[name] && errors[name],
          formName,
          value: values[name] === undefined ? '' : values[name],
          validate: validate[name],
          ...rest
        });
      case Button:
        return React.cloneElement(child, {
          disabled: hasErrors() || hasValues() || isEqual(initialValues, values)
        });
      default:
        return child;
    }
  });
  return (
    <form onSubmit={onSubmit} {...props}>
      {renderChildren}
    </form>
  );
};

Form.Field = Field;

export default Form;
