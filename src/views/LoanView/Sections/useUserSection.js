import { useLazyQuery, loans } from '../../../hooks/types';
import { useAppContext, usePrestamoContext } from '../../../context';

export const useUserSection = () => {
  const { sendMessage } = useAppContext();

  const [fetch, { loading }] = useLazyQuery(loans.ONE, null, err => {
    sendMessage({ type: 'error', message: 'Usuario no encontrado.' });
  });

  const { usuario } = usePrestamoContext();

  const onSubmit = ({ codigo }) => {
    fetch({ codigo });
  };

  return {
    loading,
    onSubmit,
    usuario
  };
};
