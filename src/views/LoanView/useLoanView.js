import { useQuery, data } from '../../hooks/types';

export const useLoanView = () => {
  useQuery(data.politicas.ALL);
};
