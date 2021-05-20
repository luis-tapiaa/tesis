import React from 'react';

import {
  Button,
  Form,
  Select,
  Input
} from '../../../components';

import { isEmpty } from '../../../util';

const BooleanSelect = props => {
  const options = [
    { id: 'true', nombre: 'Si' },
    { id: 'false', nombre: 'No' }
  ];
  return <Select {...props} options={options} />;
};

const getComponent = type => {
  switch (type) {
    case 'select':
      return Select;
    case 'bool':
      return BooleanSelect;
    default:
      return Input;
  }
};

const ConfigForm = ({
  fields,
  biblioData,
  editValues,
  initialValues,
  onSubmit,
  validate,
  loading
}) => {
  const renderFields = fields.map((f, i) => (
    <Form.Field
      key={i}
      options={biblioData}
      component={getComponent(f.type)}
      {...f}
    />
  ));

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={isEmpty(editValues) ? initialValues : editValues}
      validate={validate}
    >
      {renderFields}
      <Button type="submit" disabled={loading} loading={loading}>
        Aceptar
      </Button>
    </Form>
  );
};

export default ConfigForm;
