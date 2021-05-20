import { useEffect } from 'react';
import { useUsuariosContext } from '../../context';
import { useLazyQuery, useQuery } from '../../hooks';
import { usuarios, data } from '../../hooks/types';

export const useUserView = () => {
  const {
    offset,
    query,
    setOffset,
    usuarios: usuariosData,
    setQuery,
    setUsuarios
  } = useUsuariosContext();
  const [fetch, { loading }] = useLazyQuery(usuarios.ALL);
  useEffect(() => {
    fetch({ offset, filter: query });
    // eslint-disable-next-line
  }, [offset, query]);

  useEffect(() => {
    return () => {
      setUsuarios([]);
      setOffset(0);
    };
  }, []);

  const fetchMore = () => {
    setOffset(prev => prev + 10);
  };

  useQuery(data.bibliotecas.ALL);
  useQuery(data.gruposUsuario.ALL);

  const visibleCols = ['codigo', 'a_paterno', 'a_materno', 'nombre', 'biblioteca', 'grupo_usuario'];

  const columnAlias = {
    codigo: 'Código',
    a_paterno: 'Apellido Paterno',
    a_materno: 'Apellido Materno',
    nombre: 'Nombre(s)',
    grupo_usuario: 'Grupo Usuario'
  };

  const columns = [...visibleCols];

  const onFilter = (check, search) => {
    const query = check.map(c => `${c} ILIKE '%${search.replaceAll("'", '')}%'`);
    setQuery('WHERE ' + query.join(' OR '));
  };

  return { data: usuariosData, loading, visibleCols, columnAlias, columns, fetchMore, onFilter };
};
