import { useQuery, useMutation } from '../../../hooks';
import { data } from '../../../hooks/types';
import { isEmpty, useCRUD } from '../../../util';
import { useDataContext } from '../../../context';

export const useConfigPanel = (single, link) => {
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

  const value = useDataContext();
  const { loading } = useQuery(data[link].ALL);
  const [add, { loading: loadingAdd }] = useMutation(data[link].ADD, closeModal);
  const [update, { loading: loadingUpdate }] = useMutation(data[link].UPDATE, closeModal);
  const [drop, { loading: loadingDrop }] = useMutation(data[link].DROP, closeConfirm);

  const tableData = value[link];
  const biblioData = [{ id: '', nombre: 'Todas' }, ...(value['bibliotecas'] || [])];

  const onSubmit = ({ id, ...values }) => {
    const input = {};
    Object.keys(values).forEach(v => {
      input[v] = values[v];
      if (values[v] === '') {
        input[v] = null;
      }
      if (v === 'cargo' || v === 'costo_prestamo') {
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

  const titleModal = `${isEmpty(editValues) ? 'Crear' : 'Editar'} ${single}`;

  if (typeof editValues.disponible_prestamo === 'boolean') {
    editValues.disponible_prestamo = editValues.disponible_prestamo.toString();
  }

  return {
    biblioData,
    closeConfirm,
    closeModal,
    confirm,
    editValues,
    loading,
    loadingForm: loadingAdd || loadingUpdate,
    loadingConfirm: loadingDrop,
    modal,
    onConfirm,
    onDelete,
    onEdit,
    onSubmit,
    onAdd,
    tableData,
    titleModal
  };
};
