import { useState } from 'react';

import { useAppContext } from '../context';
import gql from './gql';

export const useMutation = ({ query, set = '', message, error, mapping, context }, onCompleted) => {
  const value = context();
  const { sendMessage } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleMutation = variables => {
    setLoading(true);
    gql(query, variables)
      .then(res => {
        value[set](mapping(res, variables));
        setLoading(false);
        if (onCompleted) {
          onCompleted(res);
        }
        if (message) sendMessage({ message });
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        if (error) sendMessage({ type: 'error', message: error });
      });
  };

  return [handleMutation, { loading }];
};
