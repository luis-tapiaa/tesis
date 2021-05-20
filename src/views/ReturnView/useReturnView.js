import moment from 'moment';

import { returns, data, useMutation, useQuery } from '../../hooks/types';
import { useDataContext, useDevolucionContext } from '../../context';
import { findPolicy, get } from '../../util';

export const useReturnView = () => {
  useQuery(data.politicas.ALL);
  const { politicas } = useDataContext();
  const [cuenta] = useMutation(returns.ADD);
  const [bloqueo] = useMutation(returns.BLOCK);
  const [returning, { loading }] = useMutation(returns.RETURN, res => {
    const { f_devolucion, f_vencimiento, item, usuario } = get(res, ['prestamos'], {});

    if (moment(f_devolucion).isAfter(f_vencimiento)) {
      const policy = findPolicy(politicas, {
        biblioteca: usuario.biblioteca,
        grupo_usuario: usuario.grupo_usuario,
        tipo_item: item.registro.marc.tipo_item
      });
      const { multa, p_sancion } = policy;
      const period = p_sancion.substring(1, p_sancion.length - 1).split(',') || [1, 'h'];

      if (multa > 0) {
        cuenta({
          input: {
            cargo: multa,
            pendiente: multa,
            nota: 'Item atrasado',
            usuario_id: usuario.id,
            item_id: item.id
          },
          usuario_id: usuario?.id
        });
      }
      if (p_sancion) {
        bloqueo({
          input: {
            usuario_id: usuario.id,
            f_inicio: moment().format(),
            f_termino: moment().add(parseInt(period[0], 10), period[1]).format()
          }
        });
      }
    }
  });
  const { items, setItems } = useDevolucionContext();

  const onSubmit = ({ codigo }) => {
    returning({
      codigo,
      input: {
        f_devolucion: moment().format()
      }
    });
  };

  const end = () => {
    setItems([]);
  };

  const formattedItems = items.map(i => ({
    codigo: i.item.codigo,
    f_prestamo: i.f_prestamo,
    f_devolucion: i.f_devolucion,
    f_vencimiento: i.f_vencimiento,
    titulo: i.item.registro.marc.titulo
  }));

  return {
    onSubmit,
    end,
    loading,
    items: formattedItems
  };
};
