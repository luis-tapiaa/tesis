import { useState, useEffect } from 'react';

export const useDropdown = ref => {
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(prev => !prev);
  };

  useEffect(() => {
    const onClick = e => {
      if (
        ref.current !== null &&
        !ref.current.contains(e.target) &&
        !e.target.matches('.dropdown-trigger') &&
        !e.target.matches('.icon')
      ) {
        setActive(false);
      }
    };

    if (active) {
      window.addEventListener('mousedown', onClick);
    }

    return () => {
      window.removeEventListener('mousedown', onClick);
    };
    // eslint-disable-next-line
  }, [active, ref]);

  return [active, toggleActive];
};
