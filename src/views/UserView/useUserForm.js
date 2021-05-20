import moment from 'moment';
import sha256 from 'js-sha256';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDataContext, useUsuariosContext } from '../../context';
import { useLazyQuery, useMutation } from '../../hooks';
import { usuarios } from '../../hooks/types';

const format = ({ biblioteca, grupo_usuario, foto, cuentas, prestamos, ...values }) => {
  return {
    ...values,
    biblioteca_id: (biblioteca || {}).id || null,
    grupo_usuario_id: (grupo_usuario || {}).id || null
  };
};

const genero = [
  { id: 'M', nombre: 'Masculino' },
  { id: 'F', nombre: 'Femenino' }
];

export const useUserForm = onClose => {
  const { id } = useParams();
  const { bibliotecas, gruposUsuario } = useDataContext();
  const [fetch] = useLazyQuery(usuarios.ONE);
  const [add, { loading: loadingAdd }] = useMutation(usuarios.ADD, onClose);
  const [update, { loading: loadingUpdate }] = useMutation(usuarios.UPDATE, onClose);
  const { usuarios: usr } = useUsuariosContext();
  const row = usr.find(r => r.id === id) || {};
  const values = format(row);

  useEffect(() => {
    if (id) {
      fetch({ id });
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = ({ id, password, ...rest }) => {
    const input = password ? { ...rest, password: sha256(password) } : rest;
    console.log(input, rest);
    if (id) {
      update({ id, input });
    } else {
      input['f_registro'] = moment().format();
      add({ input });
    }
  };

  return {
    values,
    onSubmit,
    bibliotecas,
    gruposUsuario,
    loading: loadingAdd || loadingUpdate,
    genero
  };
};
