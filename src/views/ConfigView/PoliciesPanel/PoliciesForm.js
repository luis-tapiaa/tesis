import React from 'react';

import { Button, Form, Select, Input } from '../../../components';
import { Period } from '../../../smart-components';
import { useDataContext } from '../../../context';

const PoliciesForm = ({ editValues, onSubmit, loading }) => {
  const { bibliotecas, gruposUsuario, tiposItem } = useDataContext();

  const biblioData = [{ id: '', nombre: 'Todas' }, ...bibliotecas];
  const gruposData = [{ id: '', nombre: 'Todas' }, ...gruposUsuario];
  const tiposData = [{ id: '', nombre: 'Todas' }, ...tiposItem];

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={editValues}
      validate={{ nombre: 'req', prestamos: 'req', p_prestamo: 'req', multa: 'money' }}
    >
      <Form.Field component={Input} label="Nombre" name="nombre" />
      <Form.Field component={Input.Area} label="Descripción" name="descripcion" />
      <Form.Field component={Select} label="Biblioteca" name="biblioteca_id" options={biblioData} />
      <Form.Field
        component={Select}
        label="Grupo Usuario"
        name="grupo_usuario_id"
        options={gruposData}
      />
      <Form.Field component={Select} label="Tipo de item" name="tipo_item_id" options={tiposData} />
      <Form.Field component={Input} label="Préstamos" name="prestamos" type="number" />
      <Form.Field component={Period} label="Periodo de prestamo" name="p_prestamo" />
      <Form.Field component={Input} label="Multa" name="multa" />
      <Form.Field component={Period} label="Sanción" name="p_sancion" />
      <Form.Field component={Period} label="Periodo de gracia" name="p_gracia" />
      <Form.Field component={Input} label="Renovaciones" name="renovaciones" type="number" />
      <Button type="submit" disabled={loading} loading={loading}>
        Aceptar
      </Button>
    </Form>
  );
};

export default PoliciesForm;
