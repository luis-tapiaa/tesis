import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDataContext, useInventarioContext } from '../../context';
import { useLazyQuery, useMutation } from '../../hooks';
import { inventario } from '../../hooks/types';

export const useInventoryForm = onClose => {
  const { id } = useParams();
  const { tiposItem } = useDataContext();
  const [fetch] = useLazyQuery(inventario.ONE);
  const [add, { loading: loadingAdd }] = useMutation(inventario.ADD, onClose);
  const [update, { loading: loadingUpdate }] = useMutation(inventario.UPDATE, onClose);
  const { registros } = useInventarioContext();
  const values = registros.find(r => r.id === id) || {};

  useEffect(() => {
    if (id) {
      fetch({ id });
    }
  }, []);  

  const options = tiposItem.map(t => ({ id: t.nombre, nombre: t.nombre }));

  const onSubmit = input => {
  
    if (id) {
      update({ id, input });
    } else {
      add({ input });
    }
  };

  return { values, onSubmit, options, loading: loadingAdd || loadingUpdate };
};
