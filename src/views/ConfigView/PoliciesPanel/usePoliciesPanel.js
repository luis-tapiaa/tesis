import { useDataContext } from '../../../context';

import { useQuery, useMutation } from '../../../hooks';
import { data } from '../../../hooks/types';
import { isEmpty, useCRUD } from '../../../util';

export const usePoliciesPanel = () => {
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

  const { politicas } = useDataContext();

  const { loading } = useQuery(data.politicas.ALL);
  const [add, { loading: loadingAdd }] = useMutation(data.politicas.ADD, closeModal);
  const [update, { loading: loadingUpdate }] = useMutation(data.politicas.UPDATE, closeModal);
  const [drop, { loading: loadingDrop }] = useMutation(data.politicas.DROP, closeConfirm);

  const tableData = politicas;

  const title = `${isEmpty(editValues) ? 'Crear' : 'Editar'} Politica`;

  const onSubmit = ({ id, ...values }) => {
    const input = {};
    Object.keys(values).forEach(v => {
      input[v] = values[v];
      if (values[v] === '') {
        input[v] = null;
      }
      if (v === 'multa' || v === 'prestamos' || v === 'renovaciones') {
        input[v] = parseFloat(values[v] || 0);
      }
    });
    if (isEmpty(editValues)) {
      add({ input });
    } else {
      update({ id, input });
    }
  };

  const onConfirm = () => {
    drop({ id: editValues.id });
  };

  return {
    confirm,
    closeConfirm,
    closeModal,
    editValues,
    loading,
    loadingForm: loadingAdd || loadingUpdate,
    loadingConfirm: loadingDrop,
    modal,
    onDelete,
    onEdit,
    onSubmit,
    onConfirm,
    onAdd,
    tableData,
    title
  };
};
