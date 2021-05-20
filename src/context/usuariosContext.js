import React, { createContext, useContext, useState } from 'react';

const UsuariosContext = createContext();

const UsuariosState = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [query, nextQuery] = useState('');
  const [offset, setOffset] = useState(0);

  const addUsuarios = usr => {
    setUsuarios(prev => [...prev, ...usr]);
  };

  const setQuery = next => {
    nextQuery(next);
    setOffset(0);
    setUsuarios([]);
  };

  const setUsuario = value => {
    setUsuarios(prev => {
      const index = prev.findIndex(p => p.id === value.id);
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const setPrestamo = ([vars, { prestamos: res }]) => {
    const usuario = usuarios.find(u => u.id === vars.usuario_id) || {};
    const { prestamos } = usuario;
    const next = prestamos.filter(p => p.id !== res.id);
    usuario.prestamos = [...next, res];
    setUsuario(usuario);
  };

  const setCuenta = ([vars, { cuentas: res }]) => {
    const usuario = usuarios.find(u => u.id === vars.usuario_id) || {};
    const { cuentas } = usuario;
    const next = cuentas.filter(c => c.id !== res.id);
    usuario.cuentas = [...next, res];
    setUsuario(usuario);
  };

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        setUsuarios,
        setUsuario,
        query,
        setQuery,
        offset,
        setOffset,
        addUsuarios,
        setPrestamo,
        setCuenta
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuariosContext = () => useContext(UsuariosContext);

export default UsuariosState;
