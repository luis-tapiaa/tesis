import { useState, useEffect, useRef } from 'react';

export default function useSelect(name, onChange, onBlur) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(prev => !prev);
  };

  useEffect(() => {
    const onClick = e => {
      if (ref.current !== null && !ref.current.contains(e.target)) {
        toggleActive();
        onBlur({ target: { name } });
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

  const onClick = e => {
    onChange({
      target: {
        value: e.target.getAttribute('value'),
        name
      }
    });
    toggleActive();
  };

  return { active, toggleActive, ref, onClick };
}
