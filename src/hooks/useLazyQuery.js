import { useState } from 'react';

import { get } from '../util';
import gql from './gql';

export const useLazyQuery = ({ query, set = [], format, context, load }, onCompleted, onError) => {
  const value = context();
  const [loading, setLoading] = useState(load ?? true);
  const [error, setError] = useState(null);

  const handleQuery = variables => {
    setLoading(true);
    gql(query, variables)
      .then(res => {
        set.forEach(setter => {
          value[setter](get(res, format[setter]));
        });
        if (onCompleted) onCompleted(res);
        setLoading(false);
        // sendToast
      })
      .catch(err => {
        setError(err[0]);
        setLoading(false);
        if (onError) onError(err);
        // sendToast error
      });
  };

  return [handleQuery, { loading, error }];
};
