import React from 'react';

import { Panel, Input, Button, Form, IconButton, Table } from '../../components';
import { useReturnView } from './useReturnView';
import './ReturnView.css';

const ReturnView = () => {
  const { end, onSubmit, items, loading } = useReturnView();

  const endSession = <IconButton icon="check" onClick={end} />;

  return (
    <Panel className="return-panel" title="Items devueltos" lastMenu={endSession}>
      <div className="form-container form-return">
        <Form onSubmit={onSubmit}>
          <Form.Field
            component={Input}
            className="input-barcode"
            name="codigo"
            placeholder="Codigo de barras del item"
          />
          <Button className="barcode-submit" type="submit" loading={loading}>
            Seleccionar
          </Button>
        </Form>
      </div>
      <div className="loan-user">
        <Table
          data={items}
          visibleCols={['codigo', 'f_prestamo', 'f_devolucion', 'f_vencimiento', 'titulo']}
        />
      </div>
    </Panel>
  );
};

export default ReturnView;
