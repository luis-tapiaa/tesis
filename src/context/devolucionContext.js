import React, { createContext, useContext, useState } from 'react';

const DevolucionContext = createContext();

const DevolucionState = ({ children }) => {
  const [items, setItems] = useState([]);

  return (
    <DevolucionContext.Provider
      value={{
        items,
        setItems
      }}
    >
      {children}
    </DevolucionContext.Provider>
  );
};

export const useDevolucionContext = () => useContext(DevolucionContext);

export default DevolucionState;
