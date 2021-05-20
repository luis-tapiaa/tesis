import React, { createContext, useContext, useState } from 'react';

const PrestamoContext = createContext();

const PrestamoState = ({ children }) => {
  const [usuario, setUsuario] = useState({});
  const [items, setItems] = useState([]);
  const [blocks, setBlocks] = useState([]);

  return (
    <PrestamoContext.Provider
      value={{
        usuario,
        items,
        setUsuario,
        setItems,
        blocks,
        setBlocks
      }}
    >
      {children}
    </PrestamoContext.Provider>
  );
};

export const usePrestamoContext = () => useContext(PrestamoContext);

export default PrestamoState;
