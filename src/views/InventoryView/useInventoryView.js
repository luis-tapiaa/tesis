import { useEffect } from 'react';
import { useInventarioContext } from '../../context';
import { useLazyQuery, useQuery } from '../../hooks';
import { inventario, data } from '../../hooks/types';

export const useInventoryView = () => {
  const { offset, query, setOffset, setQuery, registros, setRegistros } = useInventarioContext();
  const [fetch, { loading }] = useLazyQuery(inventario.ALL);

  useEffect(() => {
    fetch({ offset, filter: query });
    // eslint-disable-next-line
  }, [offset, query]);

  useEffect(() => {
    return () => {
      setRegistros([]);
      setOffset(0);
    };
  }, []);

  useQuery(data.bibliotecas.ALL);
  useQuery(data.tiposItem.ALL);

  const fetchMore = () => {
    setOffset(prev => prev + 10);
  };

  const visibleCols = ['autor', 'titulo', 'l_publicacion', 'tipo_item', 'editorial'];

  const columnAlias = {
    titulo: 'Título',
    l_publicacion: 'Lugar de publicación',
    tipo_item: 'Tipo de material',
    f_publicacion: 'Año',
    'isbn-issn': 'ISBN/ISSN'
  };

  const columns = [...visibleCols, 'f_publicacion', 'isbn-issn'];

  const onFilter = (check, search) => {
    const query = check.map(c => `marc->>'${c}' ILIKE '%${search.replaceAll("'", '')}%'`);
    setQuery('WHERE ' + query.join(' OR '));
  };

  return { data: registros, loading, visibleCols, columnAlias, columns, fetchMore, onFilter };
};
