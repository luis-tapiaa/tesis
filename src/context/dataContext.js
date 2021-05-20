import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataState = ({ children }) => {
  const [bibliotecas, setBibliotecas] = useState([]);
  const [gruposUsuario, setGrupoUsuarios] = useState([]);
  const [tiposItem, setTipoItems] = useState([]);
  const [multas, setMultas] = useState([]);
  const [politicas, setPoliticas] = useState([]);

  return (
    <DataContext.Provider
      value={{
        bibliotecas,
        gruposUsuario,
        tiposItem,
        multas,
        politicas,
        setBibliotecas,
        setGrupoUsuarios,
        setTipoItems,
        setMultas,
        setPoliticas
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

export default DataState;
