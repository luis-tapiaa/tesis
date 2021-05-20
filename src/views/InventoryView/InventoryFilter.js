import React from 'react';

import { Button, Input, Form } from '../../components';
import { useInventarioContext } from '../../context';

const InventoryFilter = () => {
  const { setFilter } = useInventarioContext();
  const fields = [
    { name: 'autor' },
    { name: 'titulo' },
    { name: 'l_publicacion' },
    { name: 'tipo_item' },
    { name: 'editorial' }
  ];

  const onSubmit = values => {
    for (var name in values) {
      if (!values[name]) {
        delete values[name];
      }
    }
    const arr = Object.keys(values).map(key => `marc->>'${key}'='${values[key]}'`);

    const query = arr.join(' AND ');

    setFilter(query);
  };

  const renderFields = fields.map((_, i) => (
    <Form.Field key={i} name={_.name} component={Input} placeholder={_.name} />
  ));

  return (
    <Form onSubmit={onSubmit}>
      {renderFields}
      <Button type="submit ">Aceptar</Button>
    </Form>
  );
};

export default InventoryFilter;
