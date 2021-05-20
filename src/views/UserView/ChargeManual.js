import React, { useState } from 'react';
import { Button, Form, Select, Input } from '../../components';
import { useDataContext } from '../../context';
import { loans, returns, useLazyQuery, useMutation } from '../../hooks/types';
import { get } from '../../util';

const ChargeManual = ({ usuario }) => {
  const [codigo, setCodigo] = useState('');
  const [item, setItem] = useState({});
  const { multas } = useDataContext();
  const onCompleted = res => {
    const item = get(res, ['item']);
    setItem(item);
  };
  const [find] = useLazyQuery(loans.FIND, onCompleted);
  const [fetch, { loading }] = useMutation(returns.ADD);

  return (
    <div>
      <Form
        onChangeForm={(name, value, setValues) => {
          if (name === 'multa_id') {
            const multa = multas.find(m => m.id === value) || {};
            setValues('cargo', multa.cargo);
          }
        }}
        onSubmit={values => {
          fetch({
            input: {
              ...values,
              usuario_id: usuario?.id,
              pendiente: values.cargo,
              item_id: item?.id
            },
            usuario_id: usuario?.id
          });
        }}
        validate={{ multa_id: 'req', cargo: 'req' }}
      >
        <Form.Field label="Multa" component={Select} name="multa_id" options={multas} />
        <Form.Field label="Cargo" component={Input} name="cargo" />
        <div>
          <label for="codigo_item">Codigo</label>
          <Input
            id="codigo_item"
            onChange={({ target }) => {
              setCodigo(target.value);
            }}
          />
          <Button
            disabled={!codigo.length}
            onClick={() => {
              find({ codigo });
            }}
          >
            Buscar
          </Button>
        </div>
        <Form.Field label="Nota" component={Input.Area} name="nota" />
        <Button type="submit" loading={loading}>
          Aceptar
        </Button>
      </Form>
    </div>
  );
};

export default ChargeManual;
