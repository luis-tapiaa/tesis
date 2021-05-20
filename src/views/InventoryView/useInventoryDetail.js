import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { isEmpty, useCRUD } from '../../util';
import { useLazyQuery, useMutation } from '../../hooks';
import { inventario, items } from '../../hooks/types';
import { useDataContext, useInventarioContext } from '../../context';

const formatDate = date => {
  if (!date) return '';
  const d = date.split('-');
  const day = d[2].split('T');

  return `${day[0]}-${d[1]}-${d[0]}`;
};

export const useInventoryDetail = loading => {
  const { bibliotecas } = useDataContext();
  const { id } = useParams();
  const {
    closeConfirm,
    closeModal,
    confirm,
    editValues,
    modal,
    onAdd,
    onDelete,
    onEdit
  } = useCRUD();

  const [fetch] = useLazyQuery(inventario.ONE);
  const [add, { loading: loadingAdd }] = useMutation(items.ADD, closeModal);
  const [update, { loading: loadingUpdate }] = useMutation(items.UPDATE, closeModal);
  const [drop, { loading: loadingDrop }] = useMutation(items.DROP, closeConfirm);
  const { registros } = useInventarioContext();
  const { tiposItem } = useDataContext();

  useEffect(() => {
    if (!loading) {
      fetch({ id });
    }
    // eslint-disable-next-line
  }, [id, loading]);

  const values = registros.find(r => r.id === id) || {};
  let { items: rowItems = [] } = values;
  rowItems = rowItems.map(i => ({ ...i, f_adquisicion: formatDate(i.f_adquisicion) }));

  const columnAlias = {
    codigo: 'Código',
    f_adquisicion: 'Fecha de adquisición',
    estado_item: 'Estado',
    ubicacion: 'Ubicación'
  };

  const visibleCols = [
    'codigo',
    'f_adquisicion',
    'estado_item',
    'biblioteca',
    'ubicacion',
    'precio'
  ];

  const modalProps = {
    open: modal,
    onClose: closeModal,
    title: isEmpty(editValues) ? 'Nuevo item' : 'Editar item'
  };

  const onConfirm = () => {
    drop({ id: editValues.id, regId: id });
  };

  const onSumbit = ({ id: itemId, ...row }) => {
    const input = { registro_bib_id: id };
    Object.keys(row).forEach(v => {
      input[v] = row[v];
      if (row[v] === '') {
        input[v] = null;
      }
      if (v === 'f_adquisicion') {
        const date = moment(row[v], 'DD-MM-YYYY');
        input[v] = date.format('MM/DD/YYYY');
      }
      if (v === 'precio') {
        input[v] = parseFloat(row[v] || 0);
      }
    });
    if (itemId) {
      update({ id: itemId, input, regId: id });
    } else {
      const tipoItem = tiposItem.find(t => t.nombre === values.tipo_item);
      const estado_item = tipoItem.disponible_prestamo ? 'Disponible' : 'Consulta';
      add({ input: { ...input, estado_item }, regId: id });
    }
  };

  const confirmProps = {
    open: confirm,
    onClose: closeConfirm,
    onAccept: onConfirm,
    loading: loadingDrop
  };

  return {
    values,
    items: rowItems,
    editValues,
    onEdit,
    onDelete,
    columnAlias,
    visibleCols,
    loadingForm: loadingAdd || loadingUpdate,
    modalProps,
    options: bibliotecas,
    onSumbit,
    onAdd,
    confirmProps
  };
};
