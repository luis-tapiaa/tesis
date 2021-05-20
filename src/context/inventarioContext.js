import React, { createContext, useContext, useState } from 'react';

const InventarioContext = createContext();

const InventarioState = ({ children }) => {
  const [registros, setRegistros] = useState([]);
  const [query, nextQuery] = useState('');
  const [offset, setOffset] = useState(0);

  const addRegistros = reg => {
    setRegistros(prev => [...prev, ...reg]);
  };

  const setQuery = next => {
    nextQuery(next);
    setOffset(0);
    setRegistros([]);
  };

  const setRegistro = value => {
    setRegistros(prev => {
      const index = prev.findIndex(p => p.id === value.id);
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const setItems = ([callback, id]) => {
    setRegistros(prev => {
      const value = prev.find(p => p.id === id);
      const { items = [] } = value;
      const nextItems = callback(items);
      const index = prev.findIndex(p => p.id === id);
      const next = [...prev];
      next[index] = { ...value, items: nextItems };
      return next;
    });
  };

  return (
    <InventarioContext.Provider
      value={{
        registros,
        query,
        setRegistros,
        addRegistros,
        setRegistro,
        setItems,
        setQuery,
        offset,
        setOffset
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
};

export const useInventarioContext = () => useContext(InventarioContext);

export default InventarioState;
