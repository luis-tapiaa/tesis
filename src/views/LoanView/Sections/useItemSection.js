import moment from 'moment';

import { useLazyQuery, loans, useMutation, blocks } from '../../../hooks/types';
import { useAppContext, useDataContext, usePrestamoContext } from '../../../context';
import { get, findPolicy } from '../../../util';
import { useEffect } from 'react';

export const useItemSection = () => {
  const { sendMessage } = useAppContext();

  const {
    usuario,
    items,
    blocks: bloqueos,
    setUsuario,
    setItems,
    setBlocks
  } = usePrestamoContext();
  const { politicas } = useDataContext();
  const [getBlocks] = useLazyQuery(blocks.ONE);

  useEffect(() => {
    getBlocks({ id: usuario?.id });
    // eslint-disable-next-line
  }, [usuario]);

  const [add, { loading: loadingAdd }] = useMutation(loans.ADD);
  const [update, { loading: loadingUpdate }] = useMutation(loans.UPDATE);

  const onCompleted = res => {
    const item = get(res, ['item']);

    if (item.estado_item === 'Disponible') {
      const policy = findPolicy(politicas, {
        biblioteca: usuario.biblioteca,
        grupo_usuario: usuario.grupo_usuario,
        tipo_item: item.registro.marc.tipo_item
      });

      const prestamos = get(usuario, ['prestamos'], []).filter(p => p.f_devolucion === null);

      if (prestamos.length < policy.prestamos) {
        if (!bloqueos.length) {
          const value = policy.p_prestamo;
          const period = value.substring(1, value.length - 1).split(',') || [1, 'h'];

          const input = {
            usuario_id: usuario.id,
            item_id: item.id,
            f_prestamo: moment().format(),
            f_vencimiento: moment().add(parseInt(period[0], 10), period[1]).format(),
            f_devolucion: null,
            renovaciones: 0
          };

          add({ input });
          update({ id: item.id, input: { estado_item: 'Prestado' } });
        } else {
          const fecha = moment(bloqueos[0].f_termino).format('DD MMMM YYYY');
          sendMessage({
            type: 'error',
            message: 'No se pueden hacer mas prestamos hasta el ' + fecha
          });
        }
      } else {
        sendMessage({ type: 'error', message: 'No se pueden hacer mas prestamos.' });
      }
    } else {
      sendMessage({ type: 'error', message: 'Este item no esta disponible.' });
    }
  };

  const [fetch, { loading }] = useLazyQuery(loans.FIND, onCompleted);

  const disabled = !get(usuario, ['id']);

  const onSubmit = ({ codigo }) => {
    fetch({ codigo });
  };

  const end = () => {
    setUsuario({});
    setItems([]);
    setBlocks([]);
  };

  const formattedItems = items.map((f, i) => ({
    codigo: f.codigo,
    titulo: get(f, ['registro', 'marc', 'titulo'], '-'),
    f_vencimiento: (
      get(usuario, ['prestamos'], []).find(
        p => p.f_devolucion === null && (p.item || {}).id === f.id
      ) || {}
    ).f_vencimiento
  }));

  return {
    disabled,
    end,
    items: formattedItems,
    loading,
    loadingData: loadingAdd || loadingUpdate,
    onSubmit
  };
};
