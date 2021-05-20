import { useEffect } from 'react';

import { useAppContext } from '../../context';
import { useLazyQuery } from '../../hooks';
import { auth } from '../../hooks/types';

export const useHomePage = () => {
  const { token, usuario = {} } = useAppContext();
  const [verifica, { loading }] = useLazyQuery(auth.VERIFY);

  useEffect(() => {
    document.title = 'CIRCULA';
    if (!usuario.nombre) {
      verifica({ token });
    }
    // eslint-disable-next-line
  }, []);

  return { loading };
};
