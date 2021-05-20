import React from 'react';
import { Button, Form, Key, Input } from '../../components';
import { useMutation, accounts } from '../../hooks/types';

const PayForm = ({ values, onClose, usuario }) => {
  const [pay, { loading }] = useMutation(accounts.PAY, () => {
    onClose();
  });
  return (
    <Form
      onSubmit={({ cantidad }) => {
        if (cantidad > values?.pendiente) {
          alert('No se puede pagar mas de lo que se debe.');
        } else {
          pay({
            id: values.id,
            input: { pendiente: values?.pendiente - cantidad },
            usuario_id: usuario?.id
          });
        }
      }}
      validate={{ cantidad: 'money' }}
    >
      <Key label="Multa total" value={parseFloat(values?.cargo).toFixed(2)} />
      <Key label="Restante" value={parseFloat(values?.pendiente).toFixed(2)} />
      <Form.Field name="cantidad" label="Cantidad a pagar" component={Input} />
      <Button type="submit" loading={loading}>
        Aceptar
      </Button>
    </Form>
  );
};

export default PayForm;
