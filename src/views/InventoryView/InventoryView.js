import React from 'react';

import InventoryForm from './InventoryForm';
import InventoryDetail from './InventoryDetail';
import InventoryFilter from './InventoryFilter';
import { useInventarioContext } from '../../context';
import { useInventoryView } from './useInventoryView';
import { SmartPanel } from '../../smart-components';
import { inventario } from '../../hooks/types';
import './InventoryView.css';

const InventoryView = () => {
  const rest = useInventoryView();

  const detailTitle = values => {
    return values.titulo || '';
  };

  return (
    <SmartPanel
      path="inventario"
      context={useInventarioContext}
      detail={InventoryDetail}
      form={InventoryForm}
      filter={InventoryFilter}
      drop={inventario.DROP}
      detailTitle={detailTitle}
      {...rest}
    />
  );
};

export default InventoryView;
