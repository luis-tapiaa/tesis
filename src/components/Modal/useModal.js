import { useEffect, useRef } from 'react';

export default function useModal(open, onClose, closeOnBackgroundClick) {
  const ref = useRef(null);

  useEffect(() => {
    const onClick = ({ target }) => {
      const { current } = ref;

      if (
        closeOnBackgroundClick &&
        current !== null &&
        !current.contains(target)        
      ) {
        onClose();
      }
    };

    if (open) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
    // eslint-disable-next-line
  }, [open, ref]);

  return ref;
}
