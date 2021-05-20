import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '../../hooks';
import { usuarios, useQuery, data } from '../../hooks/types';
import { useUsuariosContext } from '../../context';

const formatDate = date => {
  if (!date) return '';
  const d = date.split('-');
  const day = d[2].split('T');

  return `${day[0]}-${d[1]}-${d[0]}`;
};

export const useUserDetail = loading => {
  useQuery(data.politicas.ALL);
  useQuery(data.multas.ALL);

  const { id } = useParams();

  const [fetch] = useLazyQuery(usuarios.ONE);
  const { usuarios: usr } = useUsuariosContext();
  const [prestamo, setPrestamo] = useState(false);
  const [cuenta, setCuenta] = useState(false);

  useEffect(() => {
    if (!loading) {
      fetch({ id });
    }
    // eslint-disable-next-line
  }, [id, loading]);

  const row = usr.find(r => r.id === id) || {};
  const values = {
    ...row,
    genero: row.genero === 'M' ? 'Masculino' : 'Femenino',
    f_nacimiento: formatDate(row.f_nacimiento),
    f_vencimiento: formatDate(row.f_vencimiento),
    f_registro: formatDate(row.f_registro)
  };

  return {
    values,
    cuenta,
    prestamo,
    setPrestamo,
    setCuenta
  };
};
