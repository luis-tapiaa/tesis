import { useEffect, useState } from 'react';
import { useAppContext } from '../../context';

export const useToast = (id, duration) => {
  const { dropMessage } = useAppContext();
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const promise = new Promise((res, rej) =>
      setTimeout(() => {
        setExit(true);
        res();
      }, duration)
    );

    promise.then(() =>
      setTimeout(() => {
        dropMessage(id);
      }, 500)
    );
  }, []);

  const onExit = () => {
    setExit(true);
    setTimeout(() => {
      dropMessage(id);
    }, 500);
  };

  return { exit, onExit };
};
