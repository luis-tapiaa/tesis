import React from 'react';

import { Button, Date, Form, Select, Input } from '../../components';

const ItemForm = ({ options, submit, values, loading }) => {
  return (
    <Form
      onSubmit={submit}
      initialValues={values}
      validate={{
        codigo: 'req',
        precio: 'money',
        biblioteca_id: 'req',
        f_adquisicion: 'date'
      }}
    >
      <Form.Field component={Input} name="codigo" label="Código" />
      <Form.Field component={Date} name="f_adquisicion" label="Fecha de adquisición" />
      <Form.Field
        placeholder="Selecciona una biblioteca"
        component={Select}
        name="biblioteca_id"
        label="Biblioteca"
        options={options}
      />
      <Form.Field component={Input} name="ubicacion" label="Ubicación" />
      <Form.Field component={Input} name="precio" label="Precio" />
      <Button type="submit" loading={loading} disabled={loading}>
        Aceptar
      </Button>
    </Form>
  );
};

ItemForm.defaultProps = {
  options: []
};

export default ItemForm;
