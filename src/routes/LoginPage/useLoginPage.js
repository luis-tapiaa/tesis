import sha256 from 'js-sha256';
import { useEffect } from 'react';

import { auth, useLazyQuery } from '../../hooks/types';

export const useLoginPage = () => {
  useEffect(() => {
    document.title = 'Iniciar sesión | CIRCULA';
  }, []);

  const [login, { error, loading }] = useLazyQuery(auth.LOGIN);

  const onSubmit = ({ usuario, password }) => {
    login({ usuario, password: sha256(password) });
  };

  return { error, loading, onSubmit };
};
