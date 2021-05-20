import { useEffect, useState } from 'react';

import { get } from '../util';
import gql from './gql';

export const useQuery = ({ query, set = [], format, context }, options = {}) => {
  const value = context();
  const [loading, setLoading] = useState(false);
  const { variables } = options;

  useEffect(() => {
    setLoading(true);
    gql(query, variables)
      .then(res => {
        set.forEach(setter => {
          value[setter](get(res, format[setter]));
        });
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
    return () => setLoading(false);
    // eslint-disable-next-line
  }, []);

  return { loading };
};
