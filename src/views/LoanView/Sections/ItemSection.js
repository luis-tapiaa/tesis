import React from 'react';

import { Panel, Input, Button, Form, IconButton, Table } from '../../../components';
import { useItemSection } from './useItemSection';
import { get } from '../../../util';

const ItemSection = () => {
  const { end, items, disabled, onSubmit, loadingData, loading } = useItemSection();

  const endSession = <IconButton icon="check" onClick={end} />;

  return (
    <Panel className="loan-panel" title="Items prestados" lastMenu={endSession}>
      <div className="form-container">
        <Form onSubmit={onSubmit}>
          <Form.Field component={Input} name="codigo" placeholder="Codigo de barras del item" />
          <Button
            className="barcode-submit"
            type="submit"
            disabled={disabled || loading || loadingData}
          >
            Seleccionar
          </Button>
        </Form>
      </div>
      <div className="loan-user">
        <Table
          data={items}
          visibleCols={['codigo', 'f_vencimiento', 'titulo']}
          columnAlias={{ f_vencimiento: 'Fecha de vencimiento' }}
        />
      </div>
    </Panel>
  );
};

export default ItemSection;
