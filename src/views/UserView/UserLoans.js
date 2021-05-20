import React from 'react';
import moment from 'moment';

import { Table } from '../../components';
import { useDataContext } from '../../context';
import { Dropdown } from '../../smart-components';
import { findPolicy } from '../../util';
import { useMutation, returns } from '../../hooks/types';

const UserLoans = ({ prestamos, usuario }) => {
  const { politicas } = useDataContext();
  const [renew] = useMutation(returns.RENEW);
  const cols = [
    'f_prestamo',
    'f_vencimiento',
    'f_devolucion',
    'renovaciones',
    'codigo',
    'titulo',
    ' '
  ];

  const menu = p => [
    {
      action: () => {
        const policy = findPolicy(politicas, {
          biblioteca: usuario.biblioteca,
          grupo_usuario: usuario.grupo_usuario,
          tipo_item: p.item.registro.marc.tipo_item
        });

        const period = policy?.p_prestamo
          .substring(1, policy?.p_prestamo.length - 1)
          .split(',') || [1, 'h'];

        if (p.renovaciones < policy.renovaciones) {
          renew({
            id: p.id,
            input: {
              renovaciones: p.renovaciones + 1,
              f_vencimiento: moment(p.f_vencimiento)
                .add(parseInt(period[0], 10), period[1])
                .format()
            },
            usuario_id: usuario?.id
          });
        } else {
          alert('No se pueden hacer mas renovaciones.');
        }
      },
      label: 'Renovar',
      icon: 'logout'
    }
  ];

  const alias = {
    f_prestamo: 'Prestamo',
    f_vencimiento: 'Vencimiento',
    f_devolucion: 'Devolución'
  };

  const formattedPrestamos = prestamos?.map(p => ({
    ...p,
    codigo: p.item.codigo,
    titulo: p.item.registro.marc.titulo,
    ' ': <Dropdown icon="elipsis" menu={menu(p)} />
  }));

  return (
    <div>
      <Table data={formattedPrestamos} visibleCols={cols} columnAlias={alias} />
    </div>
  );
};

export default UserLoans;
